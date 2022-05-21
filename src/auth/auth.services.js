import passport from "passport";
import jwt from "jsonwebtoken";
// import AdminService from "../admins/adminService";

export const authenticateByJwt = passport.authenticate("jwt", {
  session: false,
});

export const createJWT = (obj) => {
  const JWT = jwt.sign({ ...obj }, process.env.JWT_SECRET, {
    expiresIn: 10000000, //
  });
  return JWT;
};


// define local authentication strategy

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// export const customAuthenticateByJwt = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const parseAuthHeader = authHeader ? authHeader.split(" ") : null;
//   if (!(parseAuthHeader && parseAuthHeader[0] === "Bearer")) {
//     return res.sendStatus(400);
//   }
//   const token = parseAuthHeader[1];
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     const adminService = new AdminService();
//     adminService.findOneById(user.id).then((admin) => {
//       req.user = admin;
//       next();
//     });
//   });
// };
