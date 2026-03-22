import { Router } from "express"
import {
  createLocation,
  updateLocation,
  getLocation
} from "../controllers/location.controller"

const router = Router()

router.post("/create", createLocation)
router.post("/location/:id", updateLocation)
router.get("/location/:id", getLocation)

export default router