"use client"

import React, { useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useSearch } from "@/contexts/searchContext"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ResourceImage } from "./resourceImage"
import RelatedResourcesWrapper from "./RelatedResourcesWrapper"
import { useTranslations } from "next-intl"

const renderFilmDetails = (details: any, t: any) => (
  <>
    <div className="grid grid-cols-2 gap-4 mb-4">
      {Object.entries(details).map(([key, value]) => {
        if (
          typeof value === "string" &&
          !key.includes("url") &&
          !key.includes("created") &&
          !key.includes("edited") &&
          !["name", "title", "opening_crawl"].includes(key)
        ) {
          return (
            <div key={key} className="space-y-1">
              <span className="text-sm text-muted-foreground">{t(`fields.${key}`)}</span>
              <p className="font-medium">{value}</p>
            </div>
          )
        }
        return null
      })}
    </div>
    {details.opening_crawl && (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">{t("fields.opening_crawl")}</h4>
        <p className="text-sm italic bg-muted p-4 rounded-md">{details.opening_crawl}</p>
      </div>
    )}
  </>
)

interface ResourceDetailsProps {
  selectedItem: any
}

export function ResourceDetails({ selectedItem }: ResourceDetailsProps) {
  const { resource, isDetailsOpen, setIsDetailsOpen } = useSearch()
  const t = useTranslations()

  useEffect(() => {
    if (isDetailsOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isDetailsOpen])

  if (!isDetailsOpen || !selectedItem) return null

  return (
    <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <SheetContent className="w-full sm:max-w-xl h-full max-h-screen overflow-hidden">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            {selectedItem?.name || selectedItem?.title || t("details.loading")}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-4rem)] mt-6 pb-7">
          <div className="space-y-6">
            <div className="relative w-full h-0 pb-[100%]">
              <ResourceImage
                resource={resource}
                url={selectedItem.url}
                name={selectedItem?.name || selectedItem?.title || ""}
                fullWidth={false}
              />
            </div>
            {resource === "films" ? (
              renderFilmDetails(selectedItem, t)
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedItem || {}).map(([key, value]) => {
                  if (
                    typeof value === "string" &&
                    !key.includes("url") &&
                    !key.includes("created") &&
                    !key.includes("edited") &&
                    !["films", "species", "vehicles", "starships", "characters", "planets", "homeworld"].includes(key)
                  ) {
                    return (
                      <div key={key} className="space-y-1">
                        <span className="text-sm text-muted-foreground">{t(`fields.${key}`)}</span>
                        <p className="font-medium">{value}</p>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            )}

            <RelatedResourcesWrapper details={selectedItem} resource={resource} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

