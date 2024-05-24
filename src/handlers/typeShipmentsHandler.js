import {
  getTypeShipmentsController,
  getTypeShipmentByIdController,
  bulkCreateTypeShipments,
} from "../controllers/typeShipmentsController.js";

bulkCreateTypeShipments();

const getOrCreateTypeShipmentsHandler = async (req, res) => {
  try {
    const shipments = await getTypeShipmentsController();

    res.status(200).send(shipments);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getTypeShipmentByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await getTypeShipmentByIdController(id);
    if (!shipment) throw new Error("Shipment not found");
    res.status(200).send(shipment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export { getOrCreateTypeShipmentsHandler, getTypeShipmentByIdHandler };
