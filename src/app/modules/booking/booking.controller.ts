/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const { userId } = (req as any).user;
  bookingData.user = userId;
  bookingData.car = bookingData.carId;
  delete bookingData.carId;
  const result = await BookingServices.createBookingIntoDB(bookingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: result,
  });
});
const returnCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;

  const result = await BookingServices.returnCarUpdateIntoDB(
    bookingId,
    endTime
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car returned successfully",
    data: result,
  });
});
const getBookings = catchAsync(async (req, res) => {
  const { userId } = (req as any).user;
  const result = await BookingServices.getBookingsFromDB(userId);
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
  returnCar,
};
