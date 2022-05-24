import express from "express";
import SellerController from "./sellerController";
const router = express.Router();
const sellerController = new SellerController();

router.post("/register", sellerController.createASeller);
router.post("/login", sellerController.handleLogin);

export default router;
