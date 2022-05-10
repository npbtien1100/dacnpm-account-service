import express from "express";
import AdminService from "../../domain/admin/AdminService";

const router = express.Router();

router.post("/register", async (req, res) => {
  const data = req.body;
  const result = await AdminService.createAnAdmin(data);

  res.status(result.statusCode).json(result.json);
});

export default router;
