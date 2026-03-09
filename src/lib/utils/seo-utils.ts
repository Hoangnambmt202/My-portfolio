/* eslint-disable @typescript-eslint/no-explicit-any */
export function calculateReadingTime(portableText: any[]): string {
  if (!portableText || portableText.length === 0) return "1 min read";

  const plainText = portableText
    .map((block: any) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join("");
    })
    .join(" ");

  const words = plainText.trim().split(/\s+/).length;
  const wpm = 225;
  const time = Math.ceil(words / wpm);
  return `${time} min read`;
}

export function generateTableOfContents(portableText: any[]) {
  if (!portableText) return [];

  return portableText
    .filter(
      (block) =>
        block._type === "block" && block.style && block.style.match(/^h[2-6]$/),
    )
    .map((block) => {
      const text = block.children.map((child: any) => child.text).join("");
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      return {
        id,
        text,
        level: parseInt(block.style.replace("h", ""), 10),
      };
    });
}
