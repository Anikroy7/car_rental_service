import { Types } from "mongoose";

export type TPaymentDetails = {
  cardHolderName: string;
  cardNo: string;
}

export type TPersonalDetails = {
  nidOrPassport: string;
  drivingLicense: string;
  additionalOptions: [string]
}

export type TBooking = {
  user: Types.ObjectId;
  car: Types.ObjectId;
  paymentDetails: TPaymentDetails;
  personalDetails: TPersonalDetails;
  date: string;
  startTime: string;
  endTime: string;
  totalCost: number;
  isReturned:boolean;
  paymentStatus:['Pending', 'Paid', 'Failed'],
  orderId: Types.ObjectId,
  status: ['approve', 'cancel', 'pending']
};

export type QueryParams = {
  carId?: string;
  date?: string;
};
