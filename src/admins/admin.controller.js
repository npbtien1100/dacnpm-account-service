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
  const result = await adminService.findOneByEmail(data.email);
  res.status(result.statusCode).json(result.json);
}
);

router.post("/creation", async (req, res) => {
  const email = req.body;
  const result = await adminService.createAdminByEmail(email);
  res.status(result.statusCode).json(result.json);
});

export default router;
