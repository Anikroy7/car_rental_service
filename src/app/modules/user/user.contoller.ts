import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";

const createUser = (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Test user created successfully!!",
    data: "Test result",
  });
};

export const UserControllers = {
  createUser,
};
