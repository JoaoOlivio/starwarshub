import { Skeleton } from "@/components/ui/skeleton"

export function RelatedResourcesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-5 w-1/4" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} className="h-6 w-20" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

