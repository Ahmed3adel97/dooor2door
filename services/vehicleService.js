import vehicle from "../models/vehicle.js";
import { location } from "../models/location.js";
import Distance from "geo-distance";
import io from "../index.js";

class vehicleService {
  static async register(vehicle_ID) {
    // check if vehicle already registred
    const oldVehicle = await vehicle.findOne({ vehicle_ID }).lean();
    if (oldVehicle) {
      return {
        status: 400,
        message: "vehicle already registered",
      };
    }

    const newVehicle = new vehicle({ vehicle_ID });
    await newVehicle.save();
    return {
      status: 204,
    };
  }
  // -----------------------------------------------------------------------------------------

  static async deregister(vehicle_ID) {
    // check if vehicle is not in the system
    const oldVehicle = await vehicle.findOne({ vehicle_ID }).lean();

    if (!oldVehicle) {
      return {
        status: 404,
        message: `No vehicle with this id ${vehicle_ID}`,
      };
    }
    await vehicle.deleteOne({ vehicle_ID });
    return {
      status: 204,
    };
  }
  // -----------------------------------------------------------------------------------------
  static async updateLocation(lat, lon, vehicle_ID, date) {
    const oldVehicle = await vehicle.findOne({ vehicle_ID });
    if (!oldVehicle) {
      return {
        status: 404,
        message: `No vehicle with this id ${vehicle_ID}`,
      };
    }
    // console.log(new Date(date), oldVehicle.location.updatTime);
    // console.log(Math.abs(new Date(date) - oldVehicle.location.updatTime));
    if (oldVehicle.location) {
      if (Math.abs(new Date(date) - oldVehicle.location.updatTime) < 3000) {
        return {
          status: 401,
          message: "You can only send once in every 3 seconds",
        };
      }
    }

    const Berlin = {
      lat: 52.53,
      lon: 13.403,
    };
    const vehicleLocation = {
      lat,
      lon,
    };
    const dist = Distance.between(vehicleLocation, Berlin);
    if (dist > Distance("3.5 km")) {
      return {
        status: 403,
        message: "Your vehicle is out of city boundry",
      };
    }
    const point = {
      type: "Point",
      coordinates: [lat, lon],
      updatTime: new Date(date),
    };
    oldVehicle.location = point;
    const validLocation = new location(point);
    try {
      await oldVehicle.save();
      await validLocation.save();
    } catch (e) {
      console.log(e);
    }
    io.emit("update_location", { lat, lon, vehicle_ID, date });
    console.log(1);
    return {
      status: 204,
    };
  }
}
export default vehicleService;
