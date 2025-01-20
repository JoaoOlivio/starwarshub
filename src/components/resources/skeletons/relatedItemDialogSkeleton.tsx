import { Skeleton } from "@/components/ui/skeleton"

interface RelatedItemDialogSkeletonProps {
  isMobile: boolean
}

export function RelatedItemDialogSkeleton({ isMobile }: RelatedItemDialogSkeletonProps) {
  return (
    <div className="space-y-6">
      <Skeleton className={`w-full ${isMobile ? 'h-[200px]' : 'h-[300px]'} rounded-lg`} />
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

