import { z } from "zod";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  }
);

export const createBookingValidationSchema = z.object({
  body: z.object({
    userID: z.string(),
    bikeId: z.string(),
    startTime: timeStringSchema,
    returnTime: timeStringSchema,
    totalCost: z.number(),
    isReturned: z.boolean(),
  }),
});

export const BikeValidation = {
  createBookingValidationSchema,
};
