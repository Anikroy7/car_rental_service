import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UsersRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users/me",
    route: UsersRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;