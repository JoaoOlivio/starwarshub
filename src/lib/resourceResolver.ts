import type { ResourceType } from '@/types/api'

export function getResourceDisplayName(resource: ResourceType) {
  const names: Record<ResourceType, string> = {
    people: 'Personagens',
    films: 'Filmes',
    planets: 'Planetas',
    species: 'Espécies',
    vehicles: 'Veículos',
    starships: 'Naves'
  }
  return names[resource]
}

export const resourceFilters: Record<ResourceType, string[]> = {
  people: ['gender', 'eye_color', 'hair_color', 'skin_color'],
  films: ['director', 'producer', 'release_date'],
  planets: ['climate', 'terrain', 'population'],
  species: ['classification', 'designation', 'language'],
  vehicles: ['manufacturer', 'vehicle_class', 'cost_in_credits'],
  starships: ['manufacturer', 'starship_class', 'hyperdrive_rating']
}

