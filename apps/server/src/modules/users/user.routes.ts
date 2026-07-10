import { Router } from "express";

import { UserController } from "./user.controller.js";

import {
  createUserSchema,
  updateUserSchema,
} from "./user.validation.js";

import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize";

const router = Router();

const controller = new UserController();

router.get(
  "/",
  authenticate,
  authorize("user.read"),
  controller.getAll
);

router.get(
  "/:id",
  authenticate,
  authorize("user.read"),
  controller.getById
);

router.post(
  "/",
  authenticate,
  authorize("user.create"),
  validate(createUserSchema),
  controller.create
);

router.patch(
  "/:id",
  authenticate,
  authorize("user.update"),
  validate(updateUserSchema),
  controller.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("user.delete"),
  controller.delete
);

export default router;