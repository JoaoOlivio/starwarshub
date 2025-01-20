import { ResourceType } from '@/types/api'
import { ResourceImage } from './resourceImage'

interface RelatedItemProps {
  name: string
  url: string
  type: ResourceType
  onClick: () => void
}

export function RelatedItem({ name, url, type, onClick }: RelatedItemProps) {
  return (
    <button 
      className="flex flex-col items-center p-2 w-full hover:bg-accent rounded-lg transition-colors"
      onClick={onClick}
    >
      <div className="relative w-20 h-20 mb-2 bg-muted rounded-lg overflow-hidden">
        <ResourceImage
          resource={type}
          url={url}
          name={name}
        />
      </div>
      <span className="text-sm text-center line-clamp-2 font-medium">
        {name}
      </span>
    </button>
  )
}

