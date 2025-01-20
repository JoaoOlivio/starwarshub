"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageOff } from "lucide-react"
import { extractIdFromUrl } from "@/lib/utils"
import { getImageUrl } from "@/lib/imageUtils"

interface ResourceImageProps {
  resource: string
  url: string
  name: string
  fullWidth?: boolean
}

export function ResourceImage({ resource, url, name, fullWidth = true }: ResourceImageProps) {
  const [imageError, setImageError] = useState(false)

  const id = extractIdFromUrl(url)
  const imageUrl = getImageUrl(resource, id)

  if (imageError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted">
        <ImageOff className="h-12 w-12 text-muted-foreground" />
      </div>
    )
  }

  return (
    <Image
      src={imageUrl || "/placeholder.svg"}
      alt={name}
      fill
      className={` transition-transform duration-300 group-hover:scale-105 ${fullWidth ? "object-cover" : "object-contain"}`}
      onError={() => setImageError(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority
    />
  )
}

