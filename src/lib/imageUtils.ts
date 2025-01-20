import { ResourceType } from '@/types/api'

export function getImageUrl(type: ResourceType | string, id: string): string {
  if (!id) return getFallbackImage(type as ResourceType)
  
  const baseUrl = 'https://starwars-visualguide.com/assets/img'
  let category = type

  switch (type) {
    case 'people':
      category = 'characters'
      break
    case 'films':
      category = 'films'
      break
    case 'species':
      category = 'species'
      break
    case 'vehicles':
      category = 'vehicles'
      break
    case 'starships':
      category = 'starships'
      break
    case 'planets':
      category = 'planets'
      break
    default:
      console.warn(`Tipo de recurso desconhecido: ${type}`)
      return getFallbackImage(type as ResourceType)
  }

  const url = `${baseUrl}/${category}/${id}.jpg`
  return url
}

export function getFallbackImage(type: ResourceType | string): string {
  const fallbacks: Record<string, string> = {
    people: '/placeholder-character.jpg',
    characters: '/placeholder-character.jpg',
    films: '/placeholder-film.jpg',
    species: '/placeholder-species.jpg',
    starships: '/placeholder-starship.jpg',
    vehicles: '/placeholder-vehicle.jpg',
    planets: '/placeholder-planet.jpg'
  }
  
  return fallbacks[type] || '/placeholder.jpg'
}

