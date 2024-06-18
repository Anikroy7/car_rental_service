import express from "express";
import { UserControllers } from "../user/user.contoller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.get("/me", auth(USER_ROLE.admin), UserControllers.getUser);

export const UsersRoutes = router;
