import jwt from "jsonwebtoken";

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

/**
 * User Authentiction Middleware
 * @param req Express Requets
 * @param res Express Response
 * @param next Express Next Function
 */
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({
      message: "Auth Error",
      status: false,
    });

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Invalid Token",
      status: false,
    });
  }
};

export default auth;
