
import passport from 'passport';
import adminService from './admin.service';
import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';

passport.use(new LocalStrategy(
    function (email, password, done) {
        // find user by email
        adminService.findOneByEmail(email).then((result) => {
            if (result.statusCode === 500) {
                return done(null, false, { message: result.json.message });
            };
            // decrypt password and compare with the password
            bcrypt.compare(password, result.json.password, function (err, res) {
                if (err) {
                    return done(null, false, { message: err });
                }
                if (res) {
                    // send jwt token
                    return done(null, result.json);
                } else {
                    return done(null, false, { message: 'Wrong password' });
                }
            });
        });
    }
));

