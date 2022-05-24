import express from "express";
import upload from "../../helper/file/FileUpload";
import sellerController from "./sellerController";
import SellerValidation from "./sellerValidate";
const router = express.Router();

router.post(
  "/register",
  SellerValidation.registerValidation,
  sellerController.createASeller
);
router.post("/login", sellerController.handleLogin);

router.get("/", sellerController.getAll);
router.get("/:id", sellerController.get);
router.post("/test", sellerController.test);
router.post("/upload", upload.single("file"), sellerController.upload);
router.post(
  "/upload-video",
  upload.single("file"),
  sellerController.uploadVideo
);

export default router;
