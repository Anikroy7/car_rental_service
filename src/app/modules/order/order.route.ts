import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/", OrderControllers.createOrder,
);
router.post(
  "/payment/confirm", OrderControllers.confirmPayment,
);

export const OrderRoutes = router;
