import { Types } from "mongoose";


export type TOrder={
    user: Types.ObjectId;
    car: Types.ObjectId;
    booking: Types.ObjectId;
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    transactionId: {
        type: String,
        required: true
    },
    totalPrice: number
}