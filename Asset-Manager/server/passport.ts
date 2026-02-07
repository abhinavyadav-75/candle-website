passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import passport from "passport";
import { User } from "./models/User";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false);
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
