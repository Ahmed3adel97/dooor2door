import express from "express";
import {
  registerVehicle,
  deRegisterVehicle,
  updateLocation,
} from "../controllers/controller.js";
import path from "path";
const __filename = fileURLToPath(import.meta.url);

import {fileURLToPath} from 'url';
const __dirname = path.join(path.dirname(__filename ), 'index.html');

const router = express.Router();

router.post("/vehicles", registerVehicle);
router.post("/vehicles/:id/locations", updateLocation);
router.delete("/vehicles/:id", deRegisterVehicle);
router.get("/", function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname);
});
export default router;
