import JwtStrategy from 'passport-jwt';
import ExtractJwt from 'passport-jwt';
import config from '../utils/config';
import {getUserById} from "../models/userModel";

const jwtStrategy = JwtStrategy.Strategy;
const extractJwt = ExtractJwt.ExtractJwt;

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt
};

export default (passport: any) => {
  passport.use(
    new jwtStrategy(options, async (payload, done) => {
      try {
        const user = await getUserById({id: payload.id});
        if(user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        console.error(error);
      }
    })
  )
};
