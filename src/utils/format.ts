const underline = (text: string): string => `\x1b[4m${text}\x1b[0m`

export const formatEntry = (entry: Entry) => [
  '',
  underline(entry.name),
  entry.signature,
  '',
  ...entry.description.split('\n'),
  ...entry.snippet.split('\n'),
  '',
  'See also:',
  entry.related.map(underline).join(', ')
]
