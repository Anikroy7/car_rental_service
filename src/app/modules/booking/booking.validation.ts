import { z } from "zod";

export const createBookingValidationSchema = z.object({
  body: z.object({
    userID: z.string().optional(),
    bikeId: z.string(),
    startTime: z.string(),
    returnTime: z.string().optional(),
    totalCost: z.number().optional(),
    isReturned: z.boolean().optional(),
  }),
});

export const BikeValidation = {
  createBookingValidationSchema,
};
