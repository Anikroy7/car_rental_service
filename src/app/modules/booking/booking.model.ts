/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";


const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
    status: {
      type: String,
      enum: ["approve", "cancel", 'pending'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending'
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default:null
    },
    startTime: {
      type: String,
      required: true,
    },
    isReturned: {
      type: Boolean,
      default: false
    },
    endTime: {
      type: String,
      default: null,
    },
    date: {
      type: String,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    personalDetails: {
      nidOrPassport: {
        type: String,
        required: true,
      },
      drivingLicense: {
        type: String,
        required: true,
      },
      additionalOptions: {
        type: [String],
      },
    },

    paymentDetails: {
      cardHolderName: {
        type: String,
        required: true,
      },
      cardNo: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
export const Booking = model<TBooking>("Booking", bookingSchema);
