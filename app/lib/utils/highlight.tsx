export function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text

  // escape regex special chars so user input like ( . * can't break the pattern
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'i'))

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-indigo-200/60 text-inherit rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  )
}