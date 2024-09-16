import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UsersRoutes } from "../modules/user/user.route";
import { CarsRoutes } from "../modules/car/car.route"
import { BookingRoutes } from "../modules/booking/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UsersRoutes,
  },
  {
    path: "/cars",
    route: CarsRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
