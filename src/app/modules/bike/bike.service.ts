import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: TBike) => {
  const newBike = await Bike.create(payload);
  if (!newBike) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create bike");
  }
  return newBike;
};

export const BikeServices = {
  createBikeIntoDB,
};
