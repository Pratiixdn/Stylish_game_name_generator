import { Fragment, ReactNode } from "react";

/**
 * Minimal markdown renderer scoped to this site's blog content shape:
 * `## Heading` lines and plain paragraphs separated by blank lines.
 * Avoids pulling in a full markdown parser for a known-simple content shape.
 */
export function renderBlogContent(content: string): ReactNode {
  const lines = content.trim().split("\n");
  const elements: ReactNode[] = [];
  let paragraphBuffer: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    const text = paragraphBuffer.join(" ").trim();
    paragraphBuffer = [];
    if (!text) return;
    elements.push(
      <p key={`p-${key++}`} className="text-muted-foreground leading-relaxed mb-5">
        {text}
      </p>
    );
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      elements.push(
        <h2 key={`h-${key++}`} className="text-xl sm:text-2xl font-bold mt-10 mb-4">
          {headingMatch[1]}
        </h2>
      );
      continue;
    }

    paragraphBuffer.push(line);
  }
  flushParagraph();

  return <Fragment>{elements}</Fragment>;
}
