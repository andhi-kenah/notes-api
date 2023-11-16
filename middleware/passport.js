import dotenv from "dotenv";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../libs/User.js";

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // secretOrKey: 'secret' // mila atao soratra matanjaka tsara => "AzErTy1-2-3-4"
  secretOrKey: process.env.KEY,
};

passport.use(
  new Strategy(options, (payload, done) => {
      // const user = await prisma.users.findUnique({where: {user_id: parseInt(payload.user_id)}}) // payload.user_id -> creena any amin ilay payload ny user_id
      console.log("JWT Payload : " + payload);
      const user = User.getUserById(payload.id)
      delete user.password;
      return user ? done(null, user) : done(null, false);
  })
);

export default passport;
