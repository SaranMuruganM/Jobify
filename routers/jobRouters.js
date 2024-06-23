import { Router } from "express";
const router = Router();
import {
  getALLJObs,
  getJOb,
  updateJob,
  deleteJob,
  createJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateIdParam,
  validateJobInput,
} from "../middleware/validationMiddleware.js";

import { checkTestUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getALLJObs)
  .post(checkTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(validateIdParam, getJOb)
  .patch(checkTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkTestUser, validateIdParam, deleteJob);

export default router;
