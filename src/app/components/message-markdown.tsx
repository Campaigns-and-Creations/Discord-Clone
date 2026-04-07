import { Box, Code, Text } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type MessageMarkdownProps = {
  content: string;
};

export function MessageMarkdown({ content }: MessageMarkdownProps) {
  return (
    <Box
      style={{
        color: "var(--mantine-color-gray-1)",
        fontSize: "var(--mantine-font-size-sm)",
        lineHeight: 1.35,
        wordBreak: "break-word",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, defaultSchema]]}
        components={{
          p: ({ children }) => (
            <Text size="sm" c="gray.1" component="p" m={0} lh={1.35} style={{ whiteSpace: "pre-wrap" }}>
              {children}
            </Text>
          ),
          h1: ({ children }) => (
            <Text size="sm" fw={700} c="gray.0" component="h1" m={0} mb={4} lh={1.35}>
              {children}
            </Text>
          ),
          h2: ({ children }) => (
            <Text size="sm" fw={700} c="gray.0" component="h2" m={0} mb={4} lh={1.35}>
              {children}
            </Text>
          ),
          h3: ({ children }) => (
            <Text size="sm" fw={700} c="gray.0" component="h3" m={0} mb={4} lh={1.35}>
              {children}
            </Text>
          ),
          h4: ({ children }) => (
            <Text size="sm" fw={700} c="gray.0" component="h4" m={0} mb={4} lh={1.35}>
              {children}
            </Text>
          ),
          h5: ({ children }) => (
            <Text size="sm" fw={700} c="gray.0" component="h5" m={0} mb={4} lh={1.35}>
              {children}
            </Text>
          ),
          h6: ({ children }) => (
            <Text size="sm" fw={700} c="gray.0" component="h6" m={0} mb={4} lh={1.35}>
              {children}
            </Text>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--mantine-color-blue-3)", textDecoration: "underline" }}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <Box
              component="blockquote"
              m={0}
              mb={4}
              px="sm"
              style={{ borderLeft: "3px solid #4a4e57", color: "var(--mantine-color-gray-4)" }}
            >
              {children}
            </Box>
          ),
          ul: ({ children }) => (
            <Box component="ul" mt={0} mb={4} pl="lg">
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" mt={0} mb={4} pl="lg">
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Box component="li" mb={1}>
              {children}
            </Box>
          ),
          code: ({ className, children }) => {
            const codeContent = String(children).replace(/\n$/, "");
            const isBlock = Boolean(className);

            if (!isBlock) {
              return <Code>{codeContent}</Code>;
            }

            return (
              <Box
                component="pre"
                mb={4}
                p="sm"
                style={{
                  overflowX: "auto",
                  backgroundColor: "#1f2023",
                  border: "1px solid #3a3d45",
                  borderRadius: 8,
                }}
              >
                <code className={className}>{codeContent}</code>
              </Box>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}