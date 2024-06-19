import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { BikeServices } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const bikeData = req.body;
  const result = await BikeServices.createBikeIntoDB(bikeData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike added successfully",
    data: result,
  });
});
const getBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getBikesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bikes retrieved successfully",
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BikeServices.updateBikeIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike updated successfully",
    data: result,
  });
});
const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.deleteBikeFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike deleted successfully",
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getBikes,
  updateBike,
  deleteBike,
};
