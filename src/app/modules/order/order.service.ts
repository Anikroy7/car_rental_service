import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TOrder } from "./order.interface";
import Order from "./order.model";
import { Booking } from "../booking/booking.model";
import { User } from "../user/user.model";
import { generateTransactionId } from "../../utils/generateRandom";
import { Car } from "../car/car.model";
import { makePayment } from "../payment/payment.utils";

const createOrderIntoDB = async (payload: TOrder) => {
  console.log(payload)
  const userInfo = await User.findById(payload.user);

  if (!userInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is not exists!!");
  }
  const carInfo = await Car.findById(payload.car);
  if (!carInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "This car is not exists!!");
  }
  const bookingInfo = await Booking.findById(payload.booking)
  if (!bookingInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "This booking is not exists!!");
  }
  const transactionId = generateTransactionId();
  const orderData = {
    car: carInfo,
    booking: bookingInfo,
    user: userInfo,
    transactionId,
    totalPrice:bookingInfo.totalCost
  }
  const newOrder=await Order.create(orderData);
  const paymentInfo = {
    transactionId,
    totalPrice: bookingInfo.totalCost ,
    user: {
      name: userInfo.name,
      email: userInfo.email,
      adderss: userInfo.address,
      phone: userInfo.phone
    },
    orderId: newOrder._id,
    bookingId: bookingInfo._id
  }
  const response = await makePayment(paymentInfo);
  return response.data.payment_url;

};

export const OrderServices = {
  createOrderIntoDB
}