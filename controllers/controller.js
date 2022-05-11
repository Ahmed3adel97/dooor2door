import vehicleService from "../services/vehicleService.js";

async function registerVehicle(req, res) {
  const vehicleId = req.body.id;
  if (!vehicleId) {
    res.status(400).send({ message: "not valid vehicle id" });
  }
  const { status, ...data } = await vehicleService.register(vehicleId);
  return res.status(status).send(data);
}

async function deRegisterVehicle(req, res) {
  const vehicleId = req.params.id;
  if (!vehicleId) {
    res.status(400).send({ message: "not valid vehicle id" });
  }
  const { status, ...data } = await vehicleService.deregister(vehicleId);
  return res.status(status).send(data);
}
async function updateLocation(req, res) {
  const vehicleId = req.params.id;
  if (!vehicleId) {
    res.status(400).send({ message: "not valid vehicle id" });
  }
  const { lat, lng, at } = req.body;
  const { status, ...data } = await vehicleService.updateLocation(
    lat,
    lng,
    vehicleId,
    at
  );

  return res.status(status).send(data);
}
export { registerVehicle, deRegisterVehicle, updateLocation };
