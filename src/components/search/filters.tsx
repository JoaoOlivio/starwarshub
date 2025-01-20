"use client"

import { useSearch } from "@/contexts/searchContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useTranslations } from "next-intl"
import { resourceFilters } from "@/lib/resourceResolver"
import { fetchFilterOptions } from "@/lib/action"

function FilterContent({ onClearFilters }: { onClearFilters?: () => void }) {
  const { resource, filters, setFilters } = useSearch()
  const [isOpen, setIsOpen] = useState(true)
  const availableFilters = resourceFilters[resource]
  const hasActiveFilters = Object.values(filters).some((value) => value && value !== "any")
  const [filterOptions, setFilterOptions] = useState<Record<string, string[]>>({})
  const t = useTranslations()

  useEffect(() => {
    const loadFilterOptions = async () => {
      const options = await fetchFilterOptions(resource)
      setFilterOptions(options)
    }
    loadFilterOptions()
  }, [resource])

  const handleFilterChange = (filter: string, value: string) => {
    if (value === "any") {
      const { [filter]: _, ...rest } = filters
      setFilters(rest)
    } else {
      setFilters({ ...filters, [filter]: value })
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="bg-card rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{t("search.filters")}</h2>
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
              {Object.values(filters).filter((value) => value && value !== "any").length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 px-2">
              <X className="h-4 w-4 mr-1" />
              {t("search.clearFilters")} ({Object.values(filters).filter((value) => value && value !== "any").length})
            </Button>
          )}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span className="sr-only">{t("search.toggleFilters")}</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <div className="p-4 space-y-4">
          {availableFilters.map((filter) => (
            <div key={filter} className="space-y-2">
              <Label htmlFor={filter} className="capitalize">
                {t(`fields.${filter}`)}
              </Label>
              <Select value={filters[filter] || ""} onValueChange={(value) => handleFilterChange(filter, value)}>
                <SelectTrigger id={filter}>
                  <SelectValue placeholder={t("filters.any")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{t("filters.any")}</SelectItem>
                  {filterOptions[filter]?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function Filters() {
  const { filters, setFilters, isFilterVisible } = useSearch()
  const [isMobile, setIsMobile] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const clearFilters = () => {
    setFilters({})
    if (isMobile) {
      setIsSheetOpen(false)
    }
  }

  if (!isFilterVisible) return null

  if (isMobile) {
    return (
      <>
        <div className="fixed bottom-4 right-4 z-50">
          <Button onClick={() => setIsSheetOpen(true)} className="rounded-full h-14 w-14 shadow-lg" size="icon">
            <ChevronUp className="h-6 w-6" />
          </Button>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>{t("search.filters")}</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FilterContent onClearFilters={clearFilters} />
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div className="hidden md:block absolute left-0 top-0 w-[280px]">
      <FilterContent onClearFilters={clearFilters} />
    </div>
  )
}

