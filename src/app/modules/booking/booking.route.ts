import express from "express";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { createBookingValidationSchema } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  BookingControllers.getAllBookings
);
router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(createBookingValidationSchema),
  BookingControllers.createBooking
);
router.get(
  "/my-bookings",
  auth(USER_ROLE.admin),
  BookingControllers.getMyBookings
);

export const BookingRoutes = router;
