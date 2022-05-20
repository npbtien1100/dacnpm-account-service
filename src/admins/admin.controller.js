import express from "express";

import adminService from "./admin.service";

const router = express.Router();

router.post("/register", async (req, res) => {
  const data = req.body
  const result = await adminService.createAnAdmin(data);

  res.status(result.statusCode).json(result.json);
});

router.get("/data", async (req, res) => {
  const data = req.query;
  console.log(data);
  res.status(200).json({ id: "get it" });
}
);

export default router;
