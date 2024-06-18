import express from "express";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { BikeControllers } from "./bike.controller";

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), BikeControllers.createBike);

export const BikesRoutes = router;
