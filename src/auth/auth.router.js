import express from "express";
const router = express.Router();
import passport from "passport";
import { createJWT, authenticateByJwt } from "./auth.services";


const responseAfterAuthorizing = (req, res, next) => {
  const token = createJWT({ id: req.user.id });
  const user = {
    error: false,
    user: { id: req.user.id, name: req.user.name, image: req.user.image },
    token: token,
    expiresIn: 10000000,
  };
  const strUser = JSON.stringify(user);
  res.render("callback", { layout: false, response: strUser });
};
router.get("/test", authenticateByJwt, responseAfterAuthorizing);
router.get("/get-token", (req, res, next) => {
  const response = createJWT({ id: 1 });
  res.send(response);
});
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/api/auth/failure" }),
  function (req, res) {
    res.status(200).send({ message: "Login success", user: req.user });
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/failure",
  }),
  responseAfterAuthorizing
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    authType: "rerequest",
    scope: ["public_profile", "email"],
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/api/auth/failure",
  }),
  responseAfterAuthorizing
);

router.get("/failure", (req, res) => {
  const message = { message: "rejected" };
  const strMessage = JSON.stringify(message);
  res.render("callback", { layout: false, response: strMessage });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "Logout Success" });
});

export default router;
