import express from "express";
import { UserControllers } from "./user.contoller";

const router = express.Router();

router.get("/create-user", UserControllers.createUser);

export const UserRoutes = router;
