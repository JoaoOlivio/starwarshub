"use client"

import { useSearch } from "@/contexts/searchContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Loader2 } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { GlobalSearchResults } from "./globalSearchResults"
import { useTranslations } from "next-intl"
import { fetchGlobalSearch } from "@/lib/action"

export default function SearchBar() {
  const t = useTranslations()
  const { setSearchTerm, isFilterVisible, setIsFilterVisible, globalSearchResults, setGlobalSearchResults } =
    useSearch()
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const debouncedValue = useDebounce(value, 300)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleGlobalSearch = async () => {
      if (debouncedValue.length < 2) {
        setGlobalSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const results = await fetchGlobalSearch(debouncedValue)
        setGlobalSearchResults(results)
      } catch (error) {
        console.error("Failed to fetch global search results:", error)
      } finally {
        setIsLoading(false)
      }
    }

    handleGlobalSearch()
  }, [debouncedValue, setGlobalSearchResults])

  useEffect(() => {
    setSearchTerm(debouncedValue)
  }, [debouncedValue, setSearchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const updateSearchInput = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <div className="relative w-full" ref={inputRef}>
      <div className="relative flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("search.placeholder")}
            className="pl-12 h-12 text-lg"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setShowResults(true)
            }}
            onFocus={() => setShowResults(true)}
          />
          {isLoading && (
            <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
        </div>
        <Button
          variant={isFilterVisible ? "default" : "outline"}
          size="icon"
          className="h-12 w-12"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
        >
          <Filter className="h-5 w-5" />
          <span className="sr-only">{t("search.filters")}</span>
        </Button>
      </div>
      {showResults && globalSearchResults.length > 0 && (
        <GlobalSearchResults
          results={globalSearchResults}
          onSelect={() => setShowResults(false)}
          updateSearchInput={updateSearchInput}
        />
      )}
    </div>
  )
}

