"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useIsMobile } from "@/hooks/useIsMobile"
import { RelatedItemDialogSkeleton } from "./skeletons/relatedItemDialogSkeleton"
import { useTranslations } from "next-intl"
import { fetchRelatedItemDetails } from "@/lib/action"
import { ResourceImage } from "./resourceImage"

interface RelatedItemDialogProps {
  isOpen: boolean
  onClose: () => void
  itemUrl: string
  itemType: string
}

export function RelatedItemDialog({ isOpen, onClose, itemUrl, itemType }: RelatedItemDialogProps) {
  const [itemDetails, setItemDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [homeworldName, setHomeworldName] = useState<string>("")
  const isMobile = useIsMobile()
  const t = useTranslations()

  useEffect(() => {
    async function fetchItemDetails() {
      if (!isOpen || !itemUrl) return

      setLoading(true)
      setError(null)
      try {
        const data = await fetchRelatedItemDetails(itemUrl)
        setItemDetails(data)
      } catch (err) {
        setError(t("errors.fetchFailed"))
      } finally {
        setLoading(false)
      }
    }

    fetchItemDetails()
  }, [isOpen, itemUrl, itemType, t])

  useEffect(() => {
    async function fetchHomeworld() {
      if (itemDetails?.homeworld) {
        try {
          const response = await fetch(itemDetails.homeworld)
          const data = await response.json()
          setHomeworldName(data.name)
        } catch (error) {
          setHomeworldName(t("errors.unknown"))
        }
      }
    }

    if (itemDetails) {
      fetchHomeworld()
    }
  }, [itemDetails, t])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? "w-[95vw]" : "max-w-4xl w-[90vw]"} max-h-[90vh] overflow-hidden`}>
        <ScrollArea className="h-[calc(90vh-2rem)]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-4">
              {loading ? t("details.loading") : itemDetails?.name || itemDetails?.title || t("details.details")}
            </DialogTitle>
          </DialogHeader>
          {loading ? (
            <RelatedItemDialogSkeleton isMobile={isMobile} />
          ) : error ? (
            <div className="text-center text-destructive p-4">{error}</div>
          ) : itemDetails ? (
            <div className="space-y-6">
              <div className={`relative ${isMobile ? "h-[200px]" : "h-[300px]"} mb-4`}>
                <ResourceImage
                  resource={itemType}
                  url={itemUrl}
                  name={itemDetails?.name || itemDetails?.title || ""}
                  fullWidth={false}
                />
              </div>
              <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
                {Object.entries(itemDetails).map(([key, value]) => {
                  if (
                    typeof value === "string" &&
                    !key.includes("url") &&
                    !key.includes("created") &&
                    !key.includes("edited") &&
                    !["name", "title"].includes(key)
                  ) {
                    if (key === "homeworld") {
                      return (
                        <div key={key} className="space-y-1">
                          <span className="text-sm font-medium text-muted-foreground">{t(`fields.${key}`)}</span>
                          <p className="text-sm">{homeworldName || t("details.loading")}</p>
                        </div>
                      )
                    }
                    return (
                      <div key={key} className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground">{t(`fields.${key}`)}</span>
                        <p className="text-sm">{value}</p>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

