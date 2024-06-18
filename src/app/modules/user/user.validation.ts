import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    role: z.string(),
  }),
});
export const updateUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
