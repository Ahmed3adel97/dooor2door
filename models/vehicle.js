import mongoose from "mongoose";
import { locationSchema } from '../models/location.js';

const vehicleSchema = new mongoose.Schema({
    vehicle_ID: {
      type: String,
    },
    location: locationSchema   
})

const vehicle = mongoose.model('vehicleSchema', vehicleSchema)
export default vehicle