import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
import { rateLimit } from "express-rate-limit";

const requestLimit = rateLimit({
  windowMs: 30000,
  max: 1,
  message: { msg: "limit exceeded try again in 30 seconds" },
});

router.post("/login", requestLimit, validateLoginInput, login);
router.post("/register", requestLimit, validateRegisterInput, register);
router.get("/logout", logout);
export default router;
