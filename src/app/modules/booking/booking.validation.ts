import { z } from "zod";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

export const createBookingValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    carId: z.string(),
    date: z.string(),
    startTime: timeStringSchema,
    endTime: timeStringSchema.optional(),
    totalCost: z.number().optional(),
  }),
});
export const createBookingReturnValidationSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: timeStringSchema,
  }),
});

export const BikeValidation = {
  createBookingValidationSchema,
  createBookingReturnValidationSchema,
};
