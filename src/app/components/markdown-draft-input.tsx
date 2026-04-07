import { Box } from "@mantine/core";
import { Fragment, useLayoutEffect, useMemo, useRef } from "react";

type MarkdownDraftInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
};

type InlineToken =
  | { type: "text"; value: string }
  | { type: "bold"; marker: string; value: string }
  | { type: "italic"; marker: string; value: string }
  | { type: "strike"; marker: string; value: string }
  | { type: "code"; marker: string; value: string }
  | { type: "link"; value: string; href: string }
  | { type: "html"; value: string };

const TOKEN_PATTERN = /(\*\*[^*\n]+\*\*|__[^_\n]+__|~~[^~\n]+~~|\*[^*\n]+\*|_[^_\n]+_|`[^`\n]*`|\[[^\]\n]+\]\([^\)\n]+\)|<\/?[A-Za-z][^>\n]*>)/g;

function tokenizeInlineMarkdown(line: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let cursor = 0;

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const fullMatch = match[0];
    const index = match.index ?? 0;

    if (index > cursor) {
      tokens.push({ type: "text", value: line.slice(cursor, index) });
    }

    if ((fullMatch.startsWith("**") && fullMatch.endsWith("**")) || (fullMatch.startsWith("__") && fullMatch.endsWith("__"))) {
      tokens.push({
        type: "bold",
        marker: fullMatch.slice(0, 2),
        value: fullMatch.slice(2, -2),
      });
    } else if ((fullMatch.startsWith("*") && fullMatch.endsWith("*")) || (fullMatch.startsWith("_") && fullMatch.endsWith("_"))) {
      tokens.push({
        type: "italic",
        marker: fullMatch.slice(0, 1),
        value: fullMatch.slice(1, -1),
      });
    } else if (fullMatch.startsWith("~~") && fullMatch.endsWith("~~")) {
      tokens.push({ type: "strike", marker: "~~", value: fullMatch.slice(2, -2) });
    } else if (fullMatch.startsWith("`") && fullMatch.endsWith("`")) {
      tokens.push({ type: "code", marker: "`", value: fullMatch.slice(1, -1) });
    } else if (fullMatch.startsWith("[") && fullMatch.includes("](")) {
      const linkMatch = /^\[([^\]]+)\]\(([^\)]+)\)$/.exec(fullMatch);
      if (linkMatch) {
        tokens.push({ type: "link", value: linkMatch[1], href: linkMatch[2] });
      } else {
        tokens.push({ type: "text", value: fullMatch });
      }
    } else if (fullMatch.startsWith("<") && fullMatch.endsWith(">")) {
      tokens.push({ type: "html", value: fullMatch });
    } else {
      tokens.push({ type: "text", value: fullMatch });
    }

    cursor = index + fullMatch.length;
  }

  if (cursor < line.length) {
    tokens.push({ type: "text", value: line.slice(cursor) });
  }

  return tokens;
}

export function MarkdownDraftInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  minRows = 2,
  maxRows = 8,
}: MarkdownDraftInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const previewLines = useMemo(() => {
    const source = value.length > 0 ? value : "";
    const lines = source.split("\n");

    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("```")) {
        return { key: `line-${index}`, mode: "fence" as const, value: line };
      }

      const fenceCountBeforeLine = lines
        .slice(0, index)
        .filter((previousLine) => previousLine.trim().startsWith("```"))
        .length;

      const insideCodeFence = fenceCountBeforeLine % 2 === 1;

      if (insideCodeFence) {
        return { key: `line-${index}`, mode: "code" as const, value: line };
      }

      return { key: `line-${index}`, mode: "inline" as const, tokens: tokenizeInlineMarkdown(line) };
    });
  }, [value]);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";

    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || 20;
    const borderTop = Number.parseFloat(computedStyle.borderTopWidth) || 0;
    const borderBottom = Number.parseFloat(computedStyle.borderBottomWidth) || 0;
    const paddingTop = Number.parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = Number.parseFloat(computedStyle.paddingBottom) || 0;

    const minHeight = Math.round(minRows * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom);
    const maxHeight = Math.round(maxRows * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom);
    const nextHeight = Math.min(maxHeight, Math.max(minHeight, textarea.scrollHeight));

    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";

    const preview = previewRef.current;
    if (preview) {
      preview.scrollTop = textarea.scrollTop;
      preview.scrollLeft = textarea.scrollLeft;
    }
  }, [maxRows, minRows, value]);

  return (
    <Box
      style={{
        position: "relative",
        borderRadius: 4,
        border: "1px solid #3a3d45",
        backgroundColor: disabled ? "#24262b" : "#2b2d31",
      }}
    >
      <Box
        ref={previewRef}
        aria-hidden
        style={{
          pointerEvents: "none",
          padding: "9px 12px",
          minHeight: 48,
          maxHeight: 192,
          overflow: "hidden",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontSize: "var(--mantine-font-size-sm)",
          lineHeight: "calc(var(--mantine-line-height) * var(--mantine-font-size-sm))",
          color: "var(--mantine-color-gray-1)",
        }}
      >
        {value.length === 0 ? (
          <span style={{ color: "var(--mantine-color-gray-5)" }}>{placeholder}</span>
        ) : (
          previewLines.map((line, index) => (
            <Fragment key={line.key}>
              {index > 0 ? <br /> : null}
              {line.mode === "fence" ? (
                <span style={{ color: "var(--mantine-color-gray-5)" }}>{line.value || " "}</span>
              ) : line.mode === "code" ? (
                <span style={{ color: "var(--mantine-color-blue-1)", fontFamily: "var(--font-mono)" }}>{line.value || " "}</span>
              ) : line.tokens.length === 0 ? (
                <span> </span>
              ) : (
                line.tokens.map((token, tokenIndex) => {
                  const tokenKey = `${line.key}-${tokenIndex}`;

                  if (token.type === "text") {
                    return <span key={tokenKey}>{token.value}</span>;
                  }

                  if (token.type === "bold") {
                    return (
                      <Fragment key={tokenKey}>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>{token.marker}</span>
                        <strong>{token.value}</strong>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>{token.marker}</span>
                      </Fragment>
                    );
                  }

                  if (token.type === "italic") {
                    return (
                      <Fragment key={tokenKey}>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>{token.marker}</span>
                        <em>{token.value}</em>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>{token.marker}</span>
                      </Fragment>
                    );
                  }

                  if (token.type === "strike") {
                    return (
                      <Fragment key={tokenKey}>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>{token.marker}</span>
                        <span style={{ textDecoration: "line-through" }}>{token.value}</span>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>{token.marker}</span>
                      </Fragment>
                    );
                  }

                  if (token.type === "code") {
                    return (
                      <Fragment key={tokenKey}>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>{token.marker}</span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            backgroundColor: "#1f2023",
                            border: "1px solid #3a3d45",
                            borderRadius: 4,
                            padding: "0 4px",
                          }}
                        >
                          {token.value || " "}
                        </span>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>{token.marker}</span>
                      </Fragment>
                    );
                  }

                  if (token.type === "link") {
                    return (
                      <Fragment key={tokenKey}>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>[</span>
                        <span style={{ color: "var(--mantine-color-blue-3)", textDecoration: "underline" }}>{token.value}</span>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>{"]("}</span>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>{token.href}</span>
                        <span style={{ color: "var(--mantine-color-gray-5)" }}>)</span>
                      </Fragment>
                    );
                  }

                  return (
                    <span key={tokenKey} style={{ color: "var(--mantine-color-gray-5)" }}>
                      {token.value}
                    </span>
                  );
                })
              )}
            </Fragment>
          ))
        )}
      </Box>

      <textarea
        ref={textareaRef}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.currentTarget.value)}
        onScroll={(event) => {
          const preview = previewRef.current;
          if (!preview) {
            return;
          }

          preview.scrollTop = event.currentTarget.scrollTop;
          preview.scrollLeft = event.currentTarget.scrollLeft;
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          minHeight: 48,
          maxHeight: 192,
          resize: "none",
          border: "none",
          outline: "none",
          background: "transparent",
          padding: "9px 12px",
          fontSize: "var(--mantine-font-size-sm)",
          lineHeight: "calc(var(--mantine-line-height) * var(--mantine-font-size-sm))",
          color: "transparent",
          caretColor: "var(--mantine-color-gray-0)",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}
        spellCheck
        aria-label="Message input"
      />
    </Box>
  );
}