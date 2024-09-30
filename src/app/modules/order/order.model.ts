import { Schema, model, Types } from "mongoose";

// Define the schema for an Order
const orderSchema = new Schema({
    user: { 
        type: Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    car: { 
        type: Types.ObjectId, 
        ref: 'Car', 
        required: true 
    },
    booking: { 
        type: Types.ObjectId, 
        ref: 'Booking', 
        required: true 
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },
    transactionId: {
        type: String,
        required: true
    },
    totalPrice: {
        required:true,
        type: Number
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Export the model
const Order = model('Order', orderSchema);

export default Order;
