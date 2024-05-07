import { Enlistment, Vehicle, Driver } from "../database/db.js";

export const createEnlistment = async (
  shipping_date,
  sender,
  origin,
  destiny,
  status,
  service_type,
  vehicle_id,
  driver_id
) => {
  const newEnlistment = await Enlistment.create({
    shipping_date,
    sender,
    origin,
    destiny,
    status,
    service_type,
  });

  newEnlistment.addVehicles(vehicle_id);
  newEnlistment.addDrivers(driver_id);
};

export const getEnlistments = async (query) => {
  const enlistments = await Enlistment.findAll({
    where: query ? query : null,

    include: [
      { model: Vehicle, attributes: ["id"], through: { attributes: [] } },
      { model: Driver, attributes: ["id"], through: { attributes: [] } },
    ],
  });

  if (enlistments.length === 0) throw Error("Enlistments not found");

  return enlistments;
};

export const getEnlistmentById = async (id) => {
  const enlistmentById = Enlistment.findByPk(id);

  return enlistmentById;
};

export const updateEnlistment = async (
  shipping_date,
  sender,
  origin,
  destiny,
  status,
  service_type
) => {
  const enlistmentById = await Enlistment.findByPk(id);

  if (!enlistmentById) throw Error("Enlistment not found");

  await enlistmentById.update({
    shipping_date,
    sender,
    origin,
    destiny,
    status,
    service_type,
  });
};

export const deleteEnlistment = async (id) => {
  const enlistmentById = await Enlistment.findByPk(id);

  if (!enlistmentById) throw Error("Enlistmen not found");

  await enlistmentById.destroy({
    where: {
      id: id,
    },
  });
};
