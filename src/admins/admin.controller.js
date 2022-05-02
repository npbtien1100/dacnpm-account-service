import express from "express";

import adminService from "./admin.service";

const router = express.Router();

router.post("/register", async (req, res) => {
  const data = req.body
  const result = await adminService.createAnAdmin(data);

  res.status(result.statusCode).json(result.json);
});

export default router;
