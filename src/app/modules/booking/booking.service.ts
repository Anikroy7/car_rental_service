import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Booking } from "./booking.model";
import { QueryParams, TBooking } from "./booking.interface";
import { calculateTotalTime } from "./booking.utils";
import { Car } from "../car/car.model";
import mongoose from "mongoose"
const ObjectId = require('mongoose').Types.ObjectId;


const createBookingIntoDB = async (payload: TBooking) => {
  const carInfo = await Car.findById(payload.car);
  if (!carInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "This car is not exists!!");
  }
  if (carInfo.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This car is deleted!!");
  }
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
  const car = await Car.findById(userBooking.car._id).select("pricePerHour");
  if (!car || !car.pricePerHour == undefined) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Something went wrong to prizing!!"
    );
  }
  const totalCost = car?.pricePerHour * totalHours;
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
  let query = Booking.find({});
  if (carId) {
    query = query.where({ "car":new ObjectId(carId) });
  }
  if (date) {

    query = query.where({"date": date});
  }

  const bookings = await query.populate('car').populate('user').exec();
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getMyBookingsFromDB,
  returnCarUpdateIntoDB,
  getAllBookingsFromDB,
};
