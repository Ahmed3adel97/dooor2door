import mongoose from "mongoose";
import dotenv from "dotenv";
import { describe, expect, jest, test } from "@jest/globals";
import vehicle from "../models/vehicle";
import { location } from "../models/location";
import vehicleService from "../services/vehicleService";

const config = dotenv.config();
const url = process.env.MONGODB_URITest;

describe("VehicleService", () => {
  jest.setTimeout(30000);
  let newVehicle;
  let vid;
  beforeAll(async () => {
    await new Promise((r) => setTimeout(r, 1000));
  });
  beforeEach(async () => {
    newVehicle = new vehicle({ vehicle_ID: "a1" });
  });
  afterEach(async () => {
    await vehicle.deleteMany({});
    await location.deleteMany({});
  });
  afterAll(async () => {
    // await vehicle.deleteMany({});
    await new Promise((r) => setTimeout(r, 500));
    mongoose.connection.close();
  });
  describe("RegisterVehicle", () => {
    const exec = async (id) => {
      const res = await vehicleService.register(id);
      return res;
    };
    test("vehicle regitered", async () => {
      const res = await exec("aa12");
      expect(res.status).toBe(204);
    });
    test("vehicle already registered", async () => {
      await newVehicle.save();
      const res = await exec("a1");
      expect(res.status).toBe(400);
    });
  }),
    describe("UpdateVehicleLocation", () => {
      const exec = async (lat, lon, vehicle_ID, date) => {
        const res = await vehicleService.updateLocation(
          lat,
          lon,
          vehicle_ID,
          date
        );
        return res;
      };
      test("Vehicle is not registered", async () => {
        const res = await exec(22.1, 55.2, "NaN", "2019-09-01T12:00:00Z");
        expect(res.status).toBe(404);
      });
      test("Vehicle is out of boundry", async () => {
        await newVehicle.save();
        const res = await exec(22.1, 55.2, "a1", "2019-09-01T12:00:00Z");
        expect(res.status).toBe(403);
      });
      test("vehicle location updated", async () => {
        await newVehicle.save();
        const res = await exec(52.53, 13.38, "a1", "2019-09-01T12:00:00Z");
        expect(res.status).toBe(204);
      });
    });
});
