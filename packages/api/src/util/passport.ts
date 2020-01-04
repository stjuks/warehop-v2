import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import models from '../db/models';

passport.use(
    new GoogleTokenStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let [user]: [any, boolean] = await models.User.findOrCreate({
                    where: {
                        googleId: profile.id
                    }
                });

                user = user.get({ plain: true });

                jwt.sign(user, process.env.JWT_SECRET, (err, token) => {
                    return done(null, { token, ...user });
                });
            } catch (err) {
                console.error(err);
                return done(err, null);
            }
        }
    )
);

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(
    new JwtStrategy(jwtOpts, (user, done) => {
        return done(null, user);
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export const authenticateGoogle = (req, res) =>
    new Promise((resolve, reject) => {
        passport.authenticate('google-token', { session: false }, (err, user, info) => {
            if (err) reject(err);
            resolve({ user });
        })(req, res);
    });

export const authenticateJWT = async (req, res) =>
    new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) reject(err);
            resolve(user);
        })(req, res);
    });
export default passport;
