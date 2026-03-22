import { useEffect } from "react"
import { api } from "../services/api"

export function useLocation(id?: string) {
  useEffect(() => {
    if (!id) return

    const watchId = navigator.geolocation.watchPosition((pos) => {
      api.post(`/location/${id}`, {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [id])
}