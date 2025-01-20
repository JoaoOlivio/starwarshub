"use client"

import { useSearch } from "@/contexts/searchContext"
import type { ResourceType } from "@/types/api"
import { Button } from "@/components/ui/button"
import { Film, User, Globe, SpaceIcon as Alien, Car, Rocket } from "lucide-react"
import { useTranslations } from "next-intl"

const resources: { value: ResourceType; label: string; icon: React.ComponentType<any> }[] = [
  { value: "people", label: "resources.people", icon: User },
  { value: "films", label: "resources.films", icon: Film },
  { value: "planets", label: "resources.planets", icon: Globe },
  { value: "species", label: "resources.species", icon: Alien },
  { value: "vehicles", label: "resources.vehicles", icon: Car },
  { value: "starships", label: "resources.starships", icon: Rocket },
]

export default function ResourceTabs() {
  const { resource, setResource, setPage } = useSearch()
  const t = useTranslations()

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {resources.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={resource === value ? "default" : "outline"}
          size="lg"
          onClick={() => {
            setResource(value)
            setPage(1)
          }}
          className="flex items-center gap-2"
        >
          <Icon className="h-4 w-4" />
          {t(label)}
        </Button>
      ))}
    </div>
  )
}

