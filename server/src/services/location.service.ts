import { Location } from "../types/location"

const locations: Record<string, Location> = {}

export const locationService = {
  create(id: string, amount: number): Location {
    const location: Location = {
      id,
      lat: null,
      lng: null,
      amount
    }

    locations[id] = location
    return location
  },

  update(id: string, lat: number, lng: number): Location | null {
    if (!locations[id]) return null

    locations[id] = {
      ...locations[id],
      lat,
      lng
    }

    return locations[id]
  },

  get(id: string): Location | null {
    return locations[id] || null
  }
}