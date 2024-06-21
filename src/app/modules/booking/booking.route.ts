import express from "express";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { createBookingValidationSchema } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(createBookingValidationSchema),
  BookingControllers.createBooking
);
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  BookingControllers.getBookings
);
router.put("/:id/return", auth(USER_ROLE.admin), BookingControllers.returnBike);

export const BookingRoutes = router;
