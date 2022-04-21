import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";
// import {
//   findOneById,
//   findOrCreateAUser,
// } from "../components/users/user.service";
import JwtStrategy from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default (passport) => {
  passport.use(
    new JwtStrategy.Strategy(opts, async function (jwt_payload, done) {
      try {
        // const user = await findOneById(jwt_payload.id);
        const user = { ...jwt_payload };
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    })
  );

  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "photos", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Co chay vao profile!");
          if (!profile._json.email) {
            return done(null, false);
          }
          const [user, created] = await findOrCreateAUser(
            { email: profile._json.email },
            {
              email: profile._json.email,
              name: profile._json.name,
              image: profile._json.picture.data.url,
              registerType: "socialLinked",
            }
          );
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          console.log({ profile });
          const user = profile;
          //   const [user, created] = await findOrCreateAUser(
          //     { email: profile._json.email },
          //     {
          //       email: profile._json.email,
          //       name: profile._json.name,
          //       image: profile._json.picture,
          //       registerType: "socialLinked",
          //     }
          //   );
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
