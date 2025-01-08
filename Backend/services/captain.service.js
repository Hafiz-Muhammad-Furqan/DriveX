const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      plate,
      capacity,
      vehicleType,
    },
  });
  return captain;
};
