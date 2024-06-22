import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Booking } from "./booking.model";
import { QueryParams, TBooking } from "./booking.interface";
import { calculateTotalTime } from "./booking.utils";
import { Car } from "../car/car.model";

const createBookingIntoDB = async (payload: TBooking) => {
  await Car.findByIdAndUpdate(payload.car, { status: "unavailable" });
  const newBooking = (
    await (await Booking.create(payload)).populate("user")
  ).populate("car");
  if (!newBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create booking!");
  }

  return newBooking;
};

const returnCarUpdateIntoDB = async (bookingId: string, endTime: string) => {
  const userBooking = await Booking.findById(bookingId).populate("car");

  if (!userBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, "Can't find any booking!");
  }
  const totalHours = calculateTotalTime(userBooking.startTime, endTime);
  const totalCost = userBooking?.car?.pricePerHour * totalHours;
  const updateDatedData = await Booking.findByIdAndUpdate(
    bookingId,
    {
      endTime,
      totalCost,
    },
    { new: true }
  )
    .populate("user")
    .populate("car");
  await Car.findByIdAndUpdate(userBooking?.car?._id, {
    status: "available",
  });
  return updateDatedData;
};

const getMyBookingsFromDB = async (userId: string) => {
  const bookings = await Booking.find({ user: userId })
    .populate("car")
    .populate("user");
  return bookings;
};
const getAllBookingsFromDB = async (params: QueryParams) => {
  const { carId, date } = params;
  let query = Booking.find().populate("car").populate("user");
  console.log(carId, date);
  if (carId) {
    query = query.where({ "car._id": carId });
  }
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    query = query.where("date").gte(startDate.getTime()).lt(endDate.getTime());
  }
  const bookings = await query.exec();
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getMyBookingsFromDB,
  returnCarUpdateIntoDB,
  getAllBookingsFromDB,
};
