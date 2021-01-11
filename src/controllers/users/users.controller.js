import {
  Exception,
  GetErrorCode,
  PayloadResponse,
} from "../../services/response.service.js";
import { userLogin, userSignUp } from "./users.helper.js";

/**
 * User Login Controller
 * @param req Express Request
 * @param res Express Response
 */
export const userLoginController = async (req, res) => {
  console.log("Function userLoginController Execution Started");
  try {
    const { email, password } = req.body;
    const token = await userLogin(email, password);

    res.status(200).json(
      PayloadResponse("Login Success", {
        token: token,
        email: email,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(GetErrorCode(err)).json(Exception(err));
  }
};

/**
 * User Signup Controller
 * @param req Express Request
 * @param res Express Response
 */
export const UserSignUpController = async (req, res) => {
  console.log("Function userSignUpController Execution Started");
  try {
    const { username, email, password } = req.body;
    const token = await userSignUp(username, email, password);

    res.status(200).json(
      PayloadResponse("Signup Success", {
        token: token,
        email: email,
        username: username,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(GetErrorCode(err)).json(Exception(err));
  }
};
