import { Path, type Characters, type Comics } from '@/types/marvel'

const MARVEL_API = import.meta.env.VITE_APP_MARVEL_API_URL
const MARVEL_API_KEY = import.meta.env.VITE_APP_MARVEL_API_PUBLIC
const API_SIGN = `apikey=${MARVEL_API_KEY}`
const ITEMS_PER_PAGE = 20

const getPagination = (page?: number): string => {
  return page ? `&offset=${page * ITEMS_PER_PAGE}` : ''
}

const getQuery = (query?: string): string => {
  return query ? `&${query}` : ''
}

const getRequestURI = (path: Path, query: string, pagination: string): string => {
  const apiPath = `http:/${MARVEL_API}/${path}`
  return `${apiPath}?${API_SIGN}${query}${pagination}`
}

const usefFetch = async (requestURI: string): Promise<Comics> => {
  const res = await fetch(requestURI)
  const jsonRes = await res.json()
  return jsonRes.data
}

interface ApiOptions {
  query?: string
  page?: number
}

const useMarvelAPI = async (path: Path, options: ApiOptions): Promise<Comics | Characters> => {
  const pagination = getPagination(options.page)
  const query = getQuery(options.query)
  const requestURI = getRequestURI(path, query, pagination)
  return usefFetch(requestURI)
}

export const useComics = async (page: number = 0): Promise<Comics> => {
  return (await useMarvelAPI(Path.COMICS, { page })) as Comics
}

export const useCharactersSearch = async (query: string, page: number = 0): Promise<Characters> => {
  return (await useMarvelAPI(Path.CHARACTERS, {
    query: `nameStartsWith=${query}`,
    page: `${page}`
  })) as Characters
}
