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
const getUserFromDB = async (_id: string) => {
  const user = await User.findById(_id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the user");
  }
  return user;
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
};
