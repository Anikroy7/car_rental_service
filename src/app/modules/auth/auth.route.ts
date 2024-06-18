import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { AuthValidation } from "../auth/auth.validation";
import { AuthControllers } from "../auth/auth.controller";
import { createUserValidationSchema } from "../user/user.validation";
import { UserControllers } from "../user/user.contoller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(createUserValidationSchema),
  UserControllers.createUser
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;