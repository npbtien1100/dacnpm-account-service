import express from "express";
import AdminController from "./AdminController";
import AdminService from "../../../domain/account/admin/AdminService";

const router = express.Router();

router.get("/", AdminController.getAll);
router.post("/register", AdminController.register);
router.post("/login", AdminController.login);
router.get("/:id", AdminController.getOne);
router.post("/new/email", AdminController.createFromEmail);

router.post("/invite-admins", async (req, res) => {
  const { emails } = req.body;
  const result = await AdminService.inviteAdmins(emails);

  res.status(result.statusCode).json(result);
});

export default router;
