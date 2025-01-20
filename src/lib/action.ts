'use server'

import { ResourceType } from '@/types/api'
import { extractIdFromUrl } from '@/lib/utils'

const BASE_URL = process.env.SWAPI_BASE_URL || 'https://swapi.dev/api'

export async function fetchInitialData() {
  const response = await fetch(`${BASE_URL}/people`)
  if (!response.ok) throw new Error('Failed to fetch initial data')
  return response.json()
}

export async function fetchResource(resource: ResourceType, searchTerm: string = '', page: number = 1) {
  const params = new URLSearchParams()
  if (searchTerm) params.append('search', searchTerm)
  if (page > 1) params.append('page', page.toString())

  const response = await fetch(`${BASE_URL}/${resource}/?${params.toString()}`)
  if (!response.ok) throw new Error('Failed to fetch data')

  return response.json()
}

export async function fetchAllResources(resource: ResourceType, searchTerm: string = '') {
  let allResults: any[] = []
  let nextPage = 1
  let hasNextPage = true

  while (hasNextPage) {
    const response = await fetchResource(resource, searchTerm, nextPage)
    allResults = [...allResults, ...response.results]
    if (response.next) {
      nextPage++
    } else {
      hasNextPage = false
    }
  }

  return allResults
}

export async function fetchById(resource: ResourceType, id: string) {
  const response = await fetch(`${BASE_URL}/${resource}/${id}`)
  if (!response.ok) throw new Error(`Failed to fetch ${resource} with id ${id}`)

  return response.json()
}

export async function fetchGlobalSearch(searchTerm: string) {
  const resources: ResourceType[] = ['people', 'films', 'planets', 'species', 'vehicles', 'starships']
  const results = await Promise.all(
    resources.map(async (resource) => {
      const response = await fetchResource(resource, searchTerm)
      return response.results.map((item: any) => ({
        id: extractIdFromUrl(item.url),
        name: item.name || item.title,
        category: resource
      }))
    })
  )
  return results.flat()
}

export async function fetchFilterOptions(resource: ResourceType) {
  const response = await fetchResource(resource)
  const results = response.results

  const filterOptions: Record<string, Set<string>> = {}

  results.forEach((item: any) => {
    Object.entries(item).forEach(([key, value]) => {
      if (typeof value === 'string' && !key.includes('url') && key !== 'created' && key !== 'edited') {
        if (!filterOptions[key]) {
          filterOptions[key] = new Set()
        }
        filterOptions[key].add(value)
      }
    })
  })

  // Converter Sets para arrays e ordenar
  const sortedOptions: Record<string, string[]> = {}
  Object.entries(filterOptions).forEach(([key, valueSet]) => {
    sortedOptions[key] = Array.from(valueSet).sort()
  })

  return sortedOptions
}


export async function fetchRelatedResources(urls: string | string[]) {
  if (typeof urls === 'string') {
    urls = [urls]
  }

  const results = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Failed to fetch related resource: ${url}`)
      return response.json()
    })
  )

  return results
}

export async function fetchRelatedItemDetails(itemUrl: string) {
  const response = await fetch(itemUrl)
  if (!response.ok) throw new Error(`Failed to fetch related item details: ${itemUrl}`)
  return response.json()
}

