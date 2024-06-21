import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Booking } from "./booking.model";
import { TBooking } from "./booking.interface";
import { calculateTotalTime } from "./booking.utils";
import { Car } from "../car/car.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const newBooking = (
    await (await Booking.create(payload)).populate("user")
  ).populate("car");
  if (!newBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create booking!");
  }
  await Car.findByIdAndUpdate(payload.car, { status: "unavailable" });

  return newBooking;
};

const returnCarUpdateIntoDB = async (bookingId: string, endTime: string) => {
  const userBooking = await Booking.findById(bookingId).populate("car");

  if (!userBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, "Can't find any booking!");
  }
  const totalHours = calculateTotalTime(userBooking.startTime, endTime);
  const totalCost = (userBooking?.car?.pricePerHour * totalHours) as number;

  return { totalCost, totalHours };
};

const getBookingsFromDB = async (userId: string) => {
  const bookings = await Booking.find({ user: userId })
    .populate("car")
    .populate("user");
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getBookingsFromDB,
  returnCarUpdateIntoDB,
};
