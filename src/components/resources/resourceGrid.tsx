"use client"

import { useSearch } from "@/contexts/searchContext"
import { useEffect, useState, useMemo } from "react"
import { ResourceCard } from "./resourceCard"
import { ResourceSkeleton } from "./skeletons/resourceSkeleton"
import { ResourceDetails } from "./resourceDetails"
import { Pagination } from "@/components/ui/pagination"
import { useIsMobile } from "@/hooks/useIsMobile"
import { fetchAllResources } from "@/lib/action"
import { getResourceDisplayName } from "@/lib/resourceResolver"

const ITEMS_PER_PAGE = 9

export default function ResourceGrid({ initialData }: { initialData: any }) {
  const { resource, searchTerm, page, setPage, filters, isFilterVisible, setSelectedItemId, setIsDetailsOpen } =
    useSearch()
  const [allData, setAllData] = useState<any[]>(initialData.results)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchAllResources(resource, searchTerm)
        setAllData(data)
      } catch (err) {
        setError("Falha ao buscar dados")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [resource, searchTerm])

  const filteredResults = useMemo(() => {
    return allData.filter((item: any) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === "any") return true
        return item[key]?.toLowerCase() === value.toLowerCase()
      })
    })
  }, [allData, filters])

  const paginatedResults = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    return filteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredResults, page])

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE)

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1)
    }
  }, [totalPages, page, setPage])

  const handleItemSelect = (item: any) => {
    setSelectedItem(item)
    setSelectedItemId(item.url.split("/").filter(Boolean).pop())
    setIsDetailsOpen(true)
  }

  if (error) return <div className="text-destructive">{error}</div>

  const hasResults = filteredResults.length > 0

  const gridClasses = isMobile ? "w-full px-4" : isFilterVisible ? "w-full md:ml-[300px]" : "w-full max-w-6xl mx-auto"

  return (
    <div className={gridClasses}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">{getResourceDisplayName(resource)}</h2>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <ResourceSkeleton key={index} />
            ))}
          </div>
        ) : !hasResults ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum resultado encontrado para os filtros selecionados.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedResults.map((item: any) => (
                <ResourceCard key={item.url} data={item} type={resource} onSelect={() => handleItemSelect(item)} />
              ))}
            </div>
            {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
          </>
        )}
        <ResourceDetails selectedItem={selectedItem} />
      </div>
    </div>
  )
}

