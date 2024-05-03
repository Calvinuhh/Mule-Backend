import {
  createVehicle,
  getVehicles,
  getVehicleById,
} from "../controllers/vehiclesController.js";

export const createVehicleHandler = (req, res) => {
  const { model, state, car_insurance, plate, fee, antiquity } = req.body;

  const stateLowerCase = state.toLowerCase();

  try {
    createVehicle(model, stateLowerCase, car_insurance, plate, fee, antiquity);

    res.status(201).json({
      "Vehicle created": {
        model,
        stateLowerCase,
        car_insurance,
        plate,
        fee,
        antiquity,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getVehiclesHandler = async (req, res) => {
  try {
    const vehicles = await getVehicles();

    res.status(200).json({ vehicles: vehicles });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getVehicleByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicleById = getVehicleById(id);

    res.status(200).json({ vehicle: vehicleById });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateVehicleHandler = async (req, res) => {
  try {
  } catch (error) {}
};

export const deleteVehicleHandler = async (req, res) => {
  try {
  } catch (error) {}
};
