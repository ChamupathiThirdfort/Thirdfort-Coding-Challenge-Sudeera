import expressValidator from "express-joi-validation";
import express from "express";
const router = express.Router();

// Controller
import {
  userLoginController,
  UserSignUpController,
} from "../controllers/users/users.controller.js";

// Validators
import {
  LoginValidator,
  SignUpValidator,
} from "../validators/user.validator.js";

const validator = expressValidator.createValidator({
  passError: true,
});

/**
 * @api {get} /api/users/login
 * @apiName User Login
 *
 * @apiParam  {String} [username] Username
 * @apiParam  {String} [password] Password
 *
 * @apiSuccess (200) {Object} `User` object with Jwt Token
 */
router.post("/login", validator.body(LoginValidator), userLoginController);

/**
 * @api {get} /api/users/signup
 * @apiName User Registration
 *
 * @apiParam  {String} [email] Email
 * @apiParam  {String} [username] Username
 * @apiParam  {String} [password] Password
 *
 * @apiSuccess (200) {Object} `User` object with Jwt Token
 */
router.post("/signup", validator.body(SignUpValidator), UserSignUpController);

export default router;
