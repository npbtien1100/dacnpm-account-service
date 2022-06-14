import express from "express";
import UserController from "./UserController";

const router = express.Router();

router.get("/", UserController.getAll);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/id/:id", UserController.getOne);
router.get("/email", UserController.getOneByEmail);

export default router;
