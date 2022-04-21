import express from "express";
import { customAuthenticateByJwt } from "../auth/auth.services";
const router = express.Router();
import AdminController from "./adminController";

router.post("/register", AdminController.createAnAdmin);
router.post("/login", AdminController.handleLogin);

//admin API
// router.get("/", customAuthenticateByJwt, AdminController.getAllAdmins);
// router.get("/:adminId", customAuthenticateByJwt, AdminController.getAnAdmin);
// router.put("/:adminId", customAuthenticateByJwt, AdminController.updateAnAdmin);

export default router;
