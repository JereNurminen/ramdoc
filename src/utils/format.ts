enum Styles {
  Underline = '\x1b[4m',
  Bold = '\x1b[1m',
  Reverse = '\x1b[7m'
}

const DEFAULT_WIDTH = 80

const wrap = (style: Styles, text: string) => `${style}${text}\x1b[0m`

const underline = (text: string): string => wrap(Styles.Underline, text)
const bold = (text: string): string => wrap(Styles.Bold, text)
const reverse = (text: string): string => wrap(Styles.Reverse, text)

const makeRow = (
  width: number,
  words: ReadonlyArray<string>,
  currentRow: string = '',
  rows: ReadonlyArray<string> = ['']
): ReadonlyArray<string> =>
  !words.length
    ? [...rows, currentRow]
    : currentRow.length + words[0].length >= width
    ? makeRow(width, words.slice(1), words[0], [...rows, currentRow])
    : makeRow(width, words.slice(1), `${currentRow} ${words[0]}`, rows)

const formatDescription = (desc: string) =>
  makeRow(
    process.stdout.columns || DEFAULT_WIDTH,
    desc.replace(/\n/g, ' ').split(' ')
  )

const formatSeeAlso = (
  seeAlsoEntries: ReadonlyArray<string>
): ReadonlyArray<string> =>
  seeAlsoEntries.length
    ? ['See also:', seeAlsoEntries.map(underline).join(', ')]
    : []

const formatSnippet = (snippet: string): ReadonlyArray<string> => {
  const rows = snippet.split('\n')
  const longestLineLength = [...rows].sort((a, b) => a.length - b.length)[
    rows.length - 1
  ].length
  return rows.map(row =>
    reverse(` ${row}${' '.repeat(longestLineLength - row.length)} `)
  )
}

export const formatEntry = (entry: Entry) => [
  '',
  underline(bold(entry.name)),
  entry.signature,
  ...formatDescription(entry.description),
  '',
  ...formatSnippet(entry.snippet),
  '',
  ...formatSeeAlso(entry.related)
]
