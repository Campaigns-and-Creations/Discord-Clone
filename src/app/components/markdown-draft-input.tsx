import { Box, Paper, Stack, Text } from "@mantine/core";
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type MarkdownDraftInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
  mentionSuggestions?: MentionSuggestionOption[];
};

export type MentionSuggestionOption = {
  key: string;
  kind: "member" | "role" | "special";
  insertText: string;
  label: string;
  subtitle?: string;
  searchTerms?: string[];
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
const MENTION_TRIGGER_PATTERN = /(?:^|[\s([{])@([A-Za-z0-9._-]*)$/;
const MENTION_TOKEN_CHAR_PATTERN = /[A-Za-z0-9._-]/;

type MentionTrigger = {
  start: number;
  end: number;
  query: string;
};

function getMentionTrigger(text: string, cursor: number): MentionTrigger | null {
  const safeCursor = Math.max(0, Math.min(cursor, text.length));
  const beforeCursor = text.slice(0, safeCursor);
  const triggerMatch = MENTION_TRIGGER_PATTERN.exec(beforeCursor);

  if (!triggerMatch) {
    return null;
  }

  const query = triggerMatch[1] ?? "";
  const start = safeCursor - query.length - 1;
  if (start < 0 || text[start] !== "@") {
    return null;
  }

  let end = safeCursor;
  while (end < text.length && MENTION_TOKEN_CHAR_PATTERN.test(text[end])) {
    end += 1;
  }

  return {
    start,
    end,
    query: query.toLowerCase(),
  };
}

function scoreMentionSuggestion(option: MentionSuggestionOption, normalizedQuery: string): number | null {
  const candidates = [
    option.insertText,
    option.label,
    ...(option.searchTerms ?? []),
  ].map((value) => value.trim().toLowerCase()).filter(Boolean);

  if (normalizedQuery.length === 0) {
    if (option.kind === "member") {
      return 30;
    }
    if (option.kind === "role") {
      return 40;
    }
    return 50;
  }

  let best: number | null = null;
  for (const candidate of candidates) {
    let score: number | null = null;

    if (candidate === normalizedQuery) {
      score = 0;
    } else if (candidate.startsWith(normalizedQuery)) {
      score = 10;
    } else {
      const includesIndex = candidate.indexOf(normalizedQuery);
      if (includesIndex >= 0) {
        score = 20 + includesIndex;
      }
    }

    if (score !== null && (best === null || score < best)) {
      best = score;
    }
  }

  if (best === null) {
    return null;
  }

  if (option.kind === "member") {
    return best;
  }

  if (option.kind === "role") {
    return best + 2;
  }

  return best + 4;
}

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
  onSubmit,
  placeholder,
  disabled = false,
  minRows = 2,
  maxRows = 8,
  mentionSuggestions = [],
}: MarkdownDraftInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [activeMention, setActiveMention] = useState<MentionTrigger | null>(null);
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);

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

  const rankedMentionSuggestions = useMemo(() => {
    if (!activeMention) {
      return [];
    }

    const rows = mentionSuggestions
      .map((option) => {
        const score = scoreMentionSuggestion(option, activeMention.query);
        if (score === null) {
          return null;
        }

        return { option, score };
      })
      .filter((item): item is { option: MentionSuggestionOption; score: number } => item !== null)
      .sort((a, b) => {
        if (a.score !== b.score) {
          return a.score - b.score;
        }

        return a.option.label.localeCompare(b.option.label);
      })
      .slice(0, 10)
      .map((item) => item.option);

    return rows;
  }, [activeMention, mentionSuggestions]);

  const isMentionMenuOpen = !disabled && Boolean(activeMention) && rankedMentionSuggestions.length > 0;

  const refreshMentionState = (nextValue: string, cursor: number) => {
    if (disabled) {
      setActiveMention(null);
      setSelectedMentionIndex(0);
      return;
    }

    const nextTrigger = getMentionTrigger(nextValue, cursor);
    setActiveMention(nextTrigger);
    setSelectedMentionIndex(0);
  };

  const applyMentionSuggestion = (suggestion: MentionSuggestionOption) => {
    const textarea = textareaRef.current;
    if (!textarea || !activeMention) {
      return;
    }

    const nextValue = `${value.slice(0, activeMention.start)}@${suggestion.insertText} ${value.slice(activeMention.end)}`;
    const nextCursor = activeMention.start + suggestion.insertText.length + 2;

    onChange(nextValue);
    setActiveMention(null);
    setSelectedMentionIndex(0);

    requestAnimationFrame(() => {
      const nextTextarea = textareaRef.current;
      if (!nextTextarea) {
        return;
      }

      nextTextarea.focus();
      nextTextarea.setSelectionRange(nextCursor, nextCursor);
    });
  };

  useEffect(() => {
    if (selectedMentionIndex < rankedMentionSuggestions.length) {
      return;
    }

    setSelectedMentionIndex(0);
  }, [rankedMentionSuggestions.length, selectedMentionIndex]);

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
              {index > 0 && <br /> }
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
        onChange={(event) => {
          const nextValue = event.currentTarget.value;
          onChange(nextValue);
          refreshMentionState(nextValue, event.currentTarget.selectionStart);
        }}
        onKeyDown={(event) => {
          if (isMentionMenuOpen) {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setSelectedMentionIndex((current) => {
                if (rankedMentionSuggestions.length === 0) {
                  return 0;
                }

                return (current + 1) % rankedMentionSuggestions.length;
              });
              return;
            }

            if (event.key === "ArrowUp") {
              event.preventDefault();
              setSelectedMentionIndex((current) => {
                if (rankedMentionSuggestions.length === 0) {
                  return 0;
                }

                return (current - 1 + rankedMentionSuggestions.length) % rankedMentionSuggestions.length;
              });
              return;
            }

            if (event.key === "Escape") {
              event.preventDefault();
              setActiveMention(null);
              return;
            }

            if (event.key === "Enter" || event.key === "Tab") {
              const selectedSuggestion = rankedMentionSuggestions[selectedMentionIndex];
              if (selectedSuggestion) {
                event.preventDefault();
                applyMentionSuggestion(selectedSuggestion);
                return;
              }
            }
          }

          if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) {
            return;
          }

          event.preventDefault();
          onSubmit?.();
        }}
        onScroll={(event) => {
          const preview = previewRef.current;
          if (!preview) {
            return;
          }

          preview.scrollTop = event.currentTarget.scrollTop;
          preview.scrollLeft = event.currentTarget.scrollLeft;
        }}
        onSelect={(event) => {
          refreshMentionState(value, event.currentTarget.selectionStart);
        }}
        onClick={(event) => {
          refreshMentionState(value, event.currentTarget.selectionStart);
        }}
        onBlur={() => {
          requestAnimationFrame(() => {
            const activeElement = document.activeElement;
            const nextTextarea = textareaRef.current;

            if (activeElement === nextTextarea) {
              return;
            }

            setActiveMention(null);
          });
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

      {isMentionMenuOpen && (
        <Paper
          shadow="md"
          radius="md"
          withBorder
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "calc(100% + 6px)",
            maxHeight: 260,
            overflowY: "auto",
            borderColor: "#3a3d45",
            backgroundColor: "#232428",
            zIndex: 20,
          }}
        >
          <Stack gap={2} p={4}>
            {rankedMentionSuggestions.map((suggestion, index) => {
              const isSelected = index === selectedMentionIndex;

              return (
                <Box
                  key={suggestion.key}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    applyMentionSuggestion(suggestion);
                  }}
                  style={{
                    borderRadius: 6,
                    padding: "6px 8px",
                    background: isSelected ? "#374151" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <Text size="sm" c="gray.0" fw={600}>
                    @{suggestion.insertText}
                  </Text>
                  <Text size="xs" c="gray.4">
                    {suggestion.subtitle ?? suggestion.label}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}