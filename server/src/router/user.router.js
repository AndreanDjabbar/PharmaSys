import express from "express";
import * as UserController from "../controller/user.controller.js";
import validateToken from "../middleware/jwt.middleware.js";
import authorizedRoles from "../middleware/role.middleware.js";
import validateSchema from "../middleware/schema.middleware.js";
import catchAsync from "../middleware/catchAsync.middleware.js";
import timeout from "connect-timeout";

import { 
  createUserSchema,
  loginSchema,
  updateStaffSchema
} from "../validation/user.validation.js";

const router = express.Router();

router.post(
    "/login", 
    timeout('2s'),
    validateSchema(loginSchema),
    catchAsync(UserController.loginController)
);
router.post(
    "/logout", 
    timeout('3s'),
    validateToken, 
    catchAsync(UserController.logoutController)
);
router.get(
  "/me", 
  timeout('3s'),
  validateToken, 
  catchAsync(UserController.getMyUserDataController)
);
router.post(
  "/", 
  validateToken,
  timeout('8s'),
  validateSchema(createUserSchema),
  authorizedRoles("ADMIN", "DEVELOPER"), 
  catchAsync(UserController.createUserController)
);
router.get(
  "/",
  timeout('5s'),
  validateToken,
  authorizedRoles("ADMIN", "DEVELOPER"), 
  catchAsync(UserController.getUsersController)
);
router.delete(
  "/staff/:id",
  timeout('5s'),
  validateToken,
  authorizedRoles("ADMIN", "DEVELOPER"), 
  catchAsync(UserController.deleteStaffController)
);
router.put(
  "/staff/:id",
  timeout('5s'),
  validateToken, 
  validateSchema(updateStaffSchema),
  authorizedRoles("ADMIN", "DEVELOPER"), 
  catchAsync(UserController.updateStaffController)
);

export default router;