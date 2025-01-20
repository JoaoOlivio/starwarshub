'use client'

import { useState, useEffect } from 'react'
import RelatedResources from "./relatedResources"
import { fetchRelatedResources } from '@/lib/action'
import { Loader } from '../loader'

interface RelatedResourcesWrapperProps {
  details: any
  resource: string
}

export default function RelatedResourcesWrapper({ details, resource }: RelatedResourcesWrapperProps) {
  const [relatedData, setRelatedData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const relationTypes = ["characters", "films", "homeworld", "species", "vehicles", "starships", "planets"]
      const newRelatedData: Record<string, any> = {}

      for (const type of relationTypes) {
        if (details[type]) {
          try {
            const resolved = await fetchRelatedResources(details[type])
            newRelatedData[type] = resolved
          } catch (error) {
            console.error(`Error loading ${type}:`, error)
          }
        }
      }

      setRelatedData(newRelatedData)
      setLoading(false)
    }

    fetchData()
  }, [details])

  if (loading) {
    return <Loader />
  }

  return <RelatedResources details={details} resource={resource} relatedData={relatedData} />
}
