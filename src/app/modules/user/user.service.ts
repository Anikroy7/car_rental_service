import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const newUser = await User.create(payload);
  console.log("fsadf", newUser);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
  }
  return newUser;
};

export const UserServices = {
  createUserIntoDB,
};
