/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const { userId } = (req as any).user;
  bookingData.userId = userId;

  const result = await BookingServices.createBookingIntoDB(bookingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});
const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.returnBikeUpdateIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike returned successfully",
    data: result,
  });
});
const getBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getBookingsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rentals retrieved successfully",
    data: result,
  });
});
export const BookingControllers = {
  createBooking,
  getBookings,
  returnBike,
};
