import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
  //if the user is exist
  const user = await User.findOne({ email: payload.email }).select(
    "email password role"
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  //if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the client

  const newUser = await User.findOne({ email: payload.email });
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
    newUser,
  };
};

export const AuthServices = {
  loginUser,
};
