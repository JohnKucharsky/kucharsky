import { IVerifyOptions, Strategy } from "passport-local";
import { UserModel } from "../user/user.model";
import { validPassword } from "../utils/password";

const verifyCallback = (
  username: string,
  password: string,
  done: (
    error: any,
    user?: Express.User | false,
    options?: IVerifyOptions
  ) => void
) => {
  UserModel.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

export const strategy = new Strategy(verifyCallback);
