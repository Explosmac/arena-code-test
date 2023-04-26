export interface Root {
  info: Info
  results: Result[]
}

export interface Info {
  count: number
  pages: number
  next: string
  prev: string
}

export interface Result {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: NamedUrl
  location: NamedUrl
  image: string
  episode: string[]
  url: string
  created: string
}

export interface NamedUrl {
  name: string
  url: string
}
