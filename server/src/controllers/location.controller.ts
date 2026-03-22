import { Request, Response } from "express"
import { v4 as uuid } from "uuid"
import { locationService } from "../services/location.service"

const FRONT_URL = process.env.FRONT_URL || "http://localhost:5173"

interface Params {
  id: string
}

export const createLocation = (req: Request, res: Response) => {
  const { amount } = req.body

  if (!amount) {
    return res.status(400).json({ error: "amount é obrigatório" })
  }

  const id = uuid()

  locationService.create(id, Number(amount))

  return res.json({
    id,
    trackLink: `${FRONT_URL}/track/${id}`,
    viewLink: `${FRONT_URL}/view/${id}`
  })
}

export const updateLocation = (
  req: Request<Params>,
  res: Response
) => {
  const { id } = req.params
  const { lat, lng } = req.body

  if (lat == null || lng == null) {
    return res.status(400).json({ error: "lat e lng são obrigatórios" })
  }

  const updated = locationService.update(id, Number(lat), Number(lng))

  if (!updated) return res.sendStatus(404)

  return res.sendStatus(200)
}

export const getLocation = (
  req: Request<Params>,
  res: Response
) => {
  const { id } = req.params

  const location = locationService.get(id)

  return res.json(location)
}