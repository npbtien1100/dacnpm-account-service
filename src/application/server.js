// Importing node modules
import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// routes
// import userRouter from "./users/userRouter";
import passport from "passport";
import cors from "cors";
import adminRouter from "./admin/AdminRouter";
// import sellerRouter from "./seller/sellerRouter";

import configPassport from "../../config/passport";

// DB config
import db from "../../config/MySQLConfig";

configPassport(passport);

// set up cors
const whitelist = ["http://localhost:3000", process.env.URL_WEB];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
// consts
const app = express();

db.sync().then(console.log("Syncing Database Done!"));
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

// app.use("/", routes);
// app.use("/api/auth", authRouter);
// app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
// app.use("/api/seller", sellerRouter);
// arrow functions
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  // destructuring
  const { address, port: currentPort } = server.address();

  // string interpolation:
  console.log(`Example app listening at http://${address}:${currentPort}`);
});

export default app;
