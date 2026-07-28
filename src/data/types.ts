export type PoemFormat = 'verse' | 'prose'

export interface Poem {
  slug: string
  title: string
  createdAt: string
  format: PoemFormat
  stanzas: string[][]
  prose?: string
  lang?: 'ru' | 'be' | 'en'
}

export interface Collection {
  id: string
  title: string
  subtitle?: string
  description?: string
  poems: Poem[]
}

export function formatPoemDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}
