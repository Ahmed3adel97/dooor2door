import vehicleService from "../services/vehicleService.js";

/**
 * @api {POST} /vehicles Register vehicles with id
 * @apiName registerVehicle
 *
 * @apiBody {String} id vehicle unique ID.
 *
 * @apiSuccess (204)
 *
 * @apiError  (400) not valid vehicle id
 * @apiError  (400) vehicle already registered
 */

async function registerVehicle(req, res) {
  const vehicleId = req.body.id;
  if (!vehicleId) {
    res.status(400).send({ message: "not valid vehicle id" });
  }
  const { status, ...data } = await vehicleService.register(vehicleId);
  return res.status(status).send(data);
}
/**
 * @api {DELETE} /vehicles deRegister vehicles with id
 * @apiName deRegisterVehicle
 *
 * @apiBody {String} id vehicle unique ID.
 *
 * @apiSuccess (204)
 *
 * @apiError  (400) not valid vehicle id
 * @apiError  (404) no vehicle with this id
 */

async function deRegisterVehicle(req, res) {
  const vehicleId = req.params.id;
  if (!vehicleId) {
    res.status(400).send({ message: "not valid vehicle id" });
  }
  const { status, ...data } = await vehicleService.deregister(vehicleId);
  return res.status(status).send(data);
}

/**
 * @api {POST} /vehicles/:id/locations updata vehicle location
 * @apiName updateLocation
 *
 * @apiParam {String} id vehicle unique ID.
 *
 * @apiBody {Number} lat Latitude
 * @apiBody {Number} lng Longitude
 * @apiBody {String} at  the time the vehicle sends update
 *  
 * @apiSuccess (204)
 *
 * @apiError  (400) Not valid vehicle id
 * @apiError  (404) No vehicle with this id
 * @apiError  (401) You can only send once in every 3 seconds
 * @apiError  (402) Your vehicle is out of city boundry
 */

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
