import { ParticlesBackground } from "@/components/backgroundParticles"
import Header from "@/components/layout/header"
import Title from "@/components/layout/title"
import { Loader } from "@/components/loader"
import ResourceGrid from "@/components/resources/resourceGrid"
import ResourceTabs from "@/components/resources/resourceTabs"
import { Filters } from "@/components/search/filters"
import SearchBar from "@/components/search/searchBar"
import { fetchInitialData } from "@/lib/action"
import { Suspense } from "react"

export default async function Home() {
  const initialData = await fetchInitialData()

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <ParticlesBackground />
      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-4">
          {/* Hero Section with Search */}
          <div className="min-h-[40vh] flex flex-col items-center justify-center py-12 space-y-6">
            <Title />
            <div className="w-full max-w-2xl">
              <SearchBar />
            </div>
            <div className="w-full max-w-3xl">
              <ResourceTabs />
            </div>
          </div>

          {/* Content Section */}
          <div className="relative">
            <Suspense fallback={<Loader />}>
              <div className="flex justify-center">
                <ResourceGrid initialData={initialData} />
              </div>
              <Filters />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

