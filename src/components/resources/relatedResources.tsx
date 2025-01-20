"use client"

import React, { useState } from "react"
import { RelatedItem } from "./relatedItem"
import type { ResourceType } from "@/types/api"
import { Button } from "@/components/ui/button"
import { RelatedItemDialog } from "./relatedItemDialog"
import { useTranslations } from "next-intl"

interface RelatedResourcesProps {
  details: any
  resource: string
  relatedData: Record<string, any>
}

export default function RelatedResources({ details, resource, relatedData }: RelatedResourcesProps) {
  const [selectedItem, setSelectedItem] = useState<{ url: string; type: string } | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const t = useTranslations()

  const handleItemClick = (url: string, type: string) => {
    setSelectedItem({ url, type })
  }

  const getItemType = (key: string): ResourceType => {
    switch (key) {
      case "characters":
        return "people"
      case "homeworld":
        return "planets"
      case "films":
        return "films"
      case "species":
        return "species"
      case "vehicles":
        return "vehicles"
      case "starships":
        return "starships"
      default:
        return key.slice(0, -1) as ResourceType
    }
  }

  const toggleExpand = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {Object.entries(relatedData).map(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null

        const itemType = getItemType(key)
        const isExpanded = expandedSections[key]
        const displayItems = Array.isArray(value) ? (isExpanded ? value : value.slice(0, 6)) : [value]

        return (
          <div key={key} className="space-y-3">
            <h3 className="text-lg font-semibold">
              {t(`fields.${key}`)}
              {Array.isArray(value) && (
                <span className="text-sm font-normal text-muted-foreground ml-2">({value.length})</span>
              )}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {displayItems.map((item, index) => (
                <RelatedItem
                  key={`${key}-${index}`}
                  name={item?.name || item?.title || t("details.loading")}
                  url={item?.url || ""}
                  type={itemType}
                  onClick={() => handleItemClick(item?.url || "", itemType)}
                />
              ))}
            </div>
            {Array.isArray(value) && value.length > 6 && (
              <Button variant="outline" onClick={() => toggleExpand(key)} className="mt-2">
                {isExpanded ? t("search.showLess") : t("search.showMore", { count: value.length - 6 })}
              </Button>
            )}
          </div>
        )
      })}

      {selectedItem && (
        <RelatedItemDialog
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          itemUrl={selectedItem.url}
          itemType={selectedItem.type}
        />
      )}
    </div>
  )
}

