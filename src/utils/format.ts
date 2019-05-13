enum Styles { Underline = '\x1b[4m', Bold = '\x1b[1m' }

const wrap = (style: Styles, text: string) => `${style}${text}\x1b[0m`

const underline = (text: string): string => wrap(Styles.Underline, text)
const bold = (text: string): string => wrap(Styles.Bold, text)

export const formatEntry = (entry: Entry) => [
  '',
  underline(bold(entry.name)),
  entry.signature,
  '',
  ...entry.description.split('\n'),
  ...entry.snippet.split('\n'),
  '',
  'See also:',
  entry.related.map(underline).join(', ')
]
