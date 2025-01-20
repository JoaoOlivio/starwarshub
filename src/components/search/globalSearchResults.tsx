import { useSearch } from "@/contexts/searchContext"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GlobalSearchResult {
  id: string
  name: string
  category: string
}

interface GlobalSearchResultsProps {
  results: GlobalSearchResult[]
  onSelect: () => void
  updateSearchInput: (value: string) => void
}

export function GlobalSearchResults({ results, onSelect, updateSearchInput }: GlobalSearchResultsProps) {
  const { setResource, setSearchTerm } = useSearch()

  const handleSelect = (result: GlobalSearchResult) => {
    setResource(result.category as any)
    setSearchTerm(result.name)
    updateSearchInput(result.name)
    onSelect()
  }

  return (
    <Card className="absolute z-50 w-full mt-2 shadow-lg">
      <CardContent className="p-0">
        <ScrollArea className="h-[200px]">
          <ul className="divide-y">
            {results.map((result) => (
              <li
                key={`${result.category}-${result.id}`}
                className="p-2 hover:bg-accent cursor-pointer"
                onClick={() => handleSelect(result)}
              >
                <div className="font-semibold">{result.name}</div>
                <div className="text-sm text-muted-foreground capitalize">{result.category}</div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

