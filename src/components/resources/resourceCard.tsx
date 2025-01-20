"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { ResourceImage } from "./resourceImage"
import { useTranslations } from "next-intl"

interface ResourceCardProps {
  data: any
  type: string
  onSelect: () => void
}

export function ResourceCard({ data, type, onSelect }: ResourceCardProps) {
  const t = useTranslations()

  const primaryFields = {
    people: ["gender", "birth_year"],
    films: ["director", "release_date"],
    planets: ["climate", "terrain"],
    species: ["classification", "language"],
    vehicles: ["model", "manufacturer"],
    starships: ["model", "starship_class"],
  }

  return (
    <Card className="group overflow-hidden bg-card hover:bg-accent/50 transition-all duration-300">
      <div className="relative w-full h-0 pb-[100%]">
        <ResourceImage resource={type} url={data.url} name={data.name || data.title} />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{data.name || data.title}</h3>
        <div className="space-y-1">
          {primaryFields[type as keyof typeof primaryFields].map(
            (field) =>
              data[field] && (
                <div key={field} className="text-sm flex justify-between">
                  <span className="text-muted-foreground">{t(`fields.${field}`)}:</span>
                  <span>{data[field]}</span>
                </div>
              ),
          )}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-4" onClick={onSelect}>
          <Info className="h-4 w-4 mr-2" />
          {t("details.viewDetails")}
        </Button>
      </CardContent>
    </Card>
  )
}

