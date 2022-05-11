import vehicle from '../models/vehicle.js'
import { location } from '../models/location.js'
import Distance from 'geo-distance'
import io from '../index.js'

class vehicleService {

      static async register (vehicle_ID) {
          // check if vehicle already registred
          const oldVehicle = await vehicle.findOne({vehicle_ID}).lean()
          console.log(oldVehicle);
          if (oldVehicle) {
              return {
                 status: 400,
                 message: 'vehicle already registered'
              }
            }

          const newVehicle = new vehicle({vehicle_ID})
          await newVehicle.save()
          return {
            status: 204,
          }
      }
      // -----------------------------------------------------------------------------------------


      static async deregister (vehicle_ID) {
          // check if vehicle is not in the system
          const oldVehicle = await vehicle.findOne({vehicle_ID}).lean()
          
          if (!oldVehicle) {
             return {
                status: 400,
                message: `no vehicle with this id ${vehicle_ID}`
             }
          }
          await vehicle.deleteOne({ vehicle_ID })
          return {
            status: 204,
          }
      }
      // -----------------------------------------------------------------------------------------
      static async updateLocation(lat, lon, vehicle_ID, date) {
          const oldVehicle = await vehicle.findOne({vehicle_ID})
          if (!oldVehicle) {
            return {
              status: 400,
              message: `no vehicle with this id ${vehicle_ID}`
            }
          }
          if(oldVehicle.location) {
            if (Math.abs(new Date(date), oldVehicle.location.updatTime) < 3000) {
              return {
                status: 400,
                message: 'you can only send once in every 3 seconds'
              }
            }
          }

          const Berlin = {
            lat: 52.53,
            lon: 13.403
          }
          const vehicleLocation = {
            lat,
            lon
          }
          const dist = Distance.between(vehicleLocation, Berlin);
          console.log();
          if(dist > Distance('3.5 km')) {
            return {
              status: 400,
              message: 'your vehicle is out of city boundry'
            }
          }
          const point = { type: 'Point', coordinates: [lat, lon], updatTime: new Date(date) };
          oldVehicle.location = point;
          const validLocation = new location(point);
          try{
            await oldVehicle.save()
            await validLocation.save()

          } catch(e){
            console.log(e);
          }
          io.emit("update_location", {lat, lon, vehicle_ID, date});

          return {
            status: 204
          }
          
        }
}
export default vehicleService