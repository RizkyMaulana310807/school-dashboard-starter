import { Router } from "express";

import { ClassController } from "./class.controller.js";

import {
  createClassSchema,
  updateClassSchema,
} from "./class.validation.js";

import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.js";
import { validate } from "../../middlewares/validate.js";

const router = Router();

const controller = new ClassController();

router.get(
  "/",
  authenticate,
  authorize("class.read"),
  controller.getAll
);

router.get(
  "/:id",
  authenticate,
  authorize("class.read"),
  controller.getById
);

router.post(
  "/",
  authenticate,
  authorize("class.create"),
  validate(createClassSchema),
  controller.create
);

router.patch(
  "/:id",
  authenticate,
  authorize("class.update"),
  validate(updateClassSchema),
  controller.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("class.delete"),
  controller.delete
);

export default router;