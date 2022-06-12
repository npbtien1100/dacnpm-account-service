import express from "express";
import SellerController from "./SellerController";

const router = express.Router();

router.post("/register", SellerController.register);
router.post("/login", SellerController.login);

export default router;
