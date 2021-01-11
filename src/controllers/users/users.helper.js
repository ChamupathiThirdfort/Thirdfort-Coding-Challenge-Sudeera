import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

// Models
import User from "../../models/User.model.js";

/**
 * User Login
 * @param email Email
 * @param password Password
 */
export const userLogin = async (email, password) => {
  console.log(`Logging User ${email}`);
  try {
    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!user) throw Error("User Not Exists:400");

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw Error("Incorrect Password!:400");

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, JWT_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    return token;
  } catch (err) {
    throw err;
  }
};

/**
 * User Signup
 * @param username Username
 * @param email Email
 * @param password Password
 */
export const userSignUp = async (username, email, password) => {
  console.log(`Signup User. Email ${email}, Username ${username}`);
  try {
    let user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (user) throw Error("User Already Exists:400");
    user = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
        username,
        email,
      },
    };
    const token = jwt.sign(payload, JWT_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    return token;
  } catch (err) {
    throw err;
  }
};
