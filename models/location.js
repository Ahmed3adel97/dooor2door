import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
      },
      updatTime: {
        type: Date
      }

})

const location = mongoose.model('locationSchema', locationSchema)
export { locationSchema, location }