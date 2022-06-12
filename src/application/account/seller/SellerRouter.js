import express from "express";
import SellerController from "./SellerController";
import { authenticateByJwt } from "../../../auth/auth.services";
const router = express.Router();

router.post("/register", SellerController.register);
router.post("/login", SellerController.login);
router.get("/:id", authenticateByJwt, SellerController.getSellerById);
router.put("/:id", authenticateByJwt, SellerController.updateSeller);

// router.post("/verify-seller", SellerController.verifySeller);
// router.post("/forgot-password", SellerController.forgotPassword);
// router.post("/reset-password", SellerController.resetPassword);
// router.post("/change-password", SellerController.changePassword);

export default router;
