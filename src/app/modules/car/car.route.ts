import express from "express";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { CarControllers } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createCarValidationSchema,
  updateCarValidationSchema,
} from "./car.validation";

const router = express.Router();

router.get("/:id", auth(USER_ROLE.admin), CarControllers.getSingleCar);
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(updateCarValidationSchema),
  CarControllers.updateCar
);

router.delete("/:id", auth(USER_ROLE.admin), CarControllers.deleteCar);

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(createCarValidationSchema),
  CarControllers.createCar
);
router.get("/", auth(USER_ROLE.admin), CarControllers.getCars);

export const CarsRoutes = router;
