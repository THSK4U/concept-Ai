export function extractIdeas(text: string): string[] {
  return text
    .split("|")
    .map((idea) => idea.trim())
    .filter((idea) => idea !== "")
}

export function generateClassDiagram(text: string): string {
  // Basic cleanup - remove any surrounding text that isn't part of the mermaid diagram
  const start = text.indexOf("classDiagram")
  if (start === -1) {
    return text // Or handle the error as appropriate
  }
  return text.substring(start)
}

