import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Booking } from "./booking.model";
import { TBooking } from "./booking.interface";
import { Bike } from "../car/car.model";
import { calculateTotalTime } from "./booking.utils";

const createBookingIntoDB = async (payload: TBooking) => {
  const newBooking = await Booking.create(payload);
  if (!newBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create booking!");
  }
  await Bike.findByIdAndUpdate(payload.bikeId, {
    isAvailable: false,
  });
  return newBooking;
};

const returnBikeUpdateIntoDB = async (_id: string) => {
  const userBooking = await Booking.findById(_id);
  if (!userBooking) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This user haven't any booking."
    );
  }
  const totalHours = calculateTotalTime(userBooking.startTime);

  return totalHours;
};

const getBookingsFromDB = async () => {
  const bookings = await Booking.find({});
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getBookingsFromDB,
  returnBikeUpdateIntoDB,
};
