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
  /* NOTE: FLOW OF API
  this route will require client to provide email in it body 
  then it will create a admin email object at Factory.js
  then the admin service will check for email exist or not. If exist then it will return error message
  if not exist then it will generate a password by using generatePassword lib 
  then it will automatically create a fullname = 'admin'. You can change it later
  then it will create a admin document in db with email , password and fullName (admin)
  then it will return success message with new password
*/
  const email = req.body;
  const result = await adminService.createAdminByEmail(email);
  res.status(result.statusCode).json(result.json);
});

export default router;
