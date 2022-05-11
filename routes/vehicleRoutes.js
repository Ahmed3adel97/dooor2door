import express from 'express'
import { registerVehicle, deRegisterVehicle, updateLocation } from '../controllers/controller.js'

const router = express.Router()

router.post('/vehicles', registerVehicle)
router.post('/vehicles/:id/locations', updateLocation)
router.delete('/vehicles/:id', deRegisterVehicle)
router.get('/', function (req, res) {
    res.sendFile('/home/ahmed/Desktop/door2door/index.html');
  });
export default router
