import express from "express";
import {
  registerVehicle,
  deRegisterVehicle,
  updateLocation,
} from "../controllers/controller.js";
import path from "path";
const __filename = fileURLToPath(import.meta.url);

const router = express.Router();

router.post("/vehicles", registerVehicle);
router.post("/vehicles/:id/locations", updateLocation);
router.delete("/vehicles/:id", deRegisterVehicle);

export default router;
