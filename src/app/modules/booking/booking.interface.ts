import { Types } from "mongoose";

export type TBooking = {
  user: Types.ObjectId;
  car: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  totalCost: number;
};
