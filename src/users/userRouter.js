import express from "express";
import UserController from "./userController";
import { authenticateByJwt } from "../auth/auth.services";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// router.get("/", UserController.getAll);
// router.get("/:id", UserController.get);
// router.put("/:id", UserController.update);
// router.delete("/:id", UserController.delete);

export default router;
