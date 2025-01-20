'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { ResourceType } from '@/types/api'

interface Filters {
  [key: string]: string
}

interface GlobalSearchResult {
  id: string;
  name: string;
  category: ResourceType;
}

interface SearchContextType {
  searchTerm: string
  setSearchTerm: (term: string) => void
  resource: ResourceType
  setResource: (resource: ResourceType) => void
  page: number
  setPage: (page: number) => void
  filters: Filters
  setFilters: (filters: Filters) => void
  selectedItemId: string | null
  setSelectedItemId: (id: string | null) => void
  isDetailsOpen: boolean
  setIsDetailsOpen: (open: boolean) => void
  isFilterVisible: boolean
  setIsFilterVisible: (visible: boolean) => void
  globalSearchResults: GlobalSearchResult[]
  setGlobalSearchResults: (results: GlobalSearchResult[]) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [resource, setResource] = useState<ResourceType>('people')
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<Filters>({})
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [globalSearchResults, setGlobalSearchResults] = useState<GlobalSearchResult[]>([])

  return (
    <SearchContext.Provider 
      value={{ 
        searchTerm, 
        setSearchTerm, 
        resource, 
        setResource, 
        page, 
        setPage,
        filters,
        setFilters,
        selectedItemId,
        setSelectedItemId,
        isDetailsOpen,
        setIsDetailsOpen,
        isFilterVisible,
        setIsFilterVisible,
        globalSearchResults,
        setGlobalSearchResults
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }
  return context
}

