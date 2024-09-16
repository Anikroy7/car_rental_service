import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { CarServices } from "./car.service";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary";

const createCar = catchAsync(async (req, res) => {
  const carData = req.body;
  const urls = [];
  if (req.files) {
    const files = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files).flat();
    for (const file of files) {
      const newPath = (await uploadImageToCloudinary(
        `${process.cwd()}/${file.path}`,
        file.path
      )) as any;
      urls.push(newPath.secure_url);
    }
  }
  carData.images = urls;
  const result = await CarServices.createCarIntoDB(carData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car created successfully",
    data: result,
  });
});
const getCars = catchAsync(async (req, res) => {
  const result = await CarServices.getCarsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars retrieved successfully",
    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A Car retrieved successfully",
    data: result,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CarServices.updateCarIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car updated successfully",
    data: result,
  });
});
const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car deleted successfully",
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getCars,
  updateCar,
  deleteCar,
  getSingleCar,
};
