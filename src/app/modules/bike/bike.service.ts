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
const getBikesFromDB = async () => {
  const bikes = await Bike.find({}).select("-createdAt -updatedAt -__v");
  return bikes;
};

const updateBikeIntoDB = async (_id: string, payload: TBike) => {
  const bike = await Bike.findById(_id);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the bike");
  }

  const updatedData = {
    ...bike.toObject(),
    ...payload,
  };
  const updatedBike = await Bike.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    select: "-createdAt -updatedAt -__v",
  });
  return updatedBike;
};

const deleteBikeFromDB = async (_id: string) => {
  const result = await Bike.findByIdAndDelete(_id, { new: true });
  return result;
};
export const BikeServices = {
  createBikeIntoDB,
  getBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
