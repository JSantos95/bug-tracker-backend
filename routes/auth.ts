import express from 'express';
import { register, login, forgotPassword, resetPassword, allUser, update } from "../controllers/auth";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resetToken").put(resetPassword);
router.route("/").get(allUser);
router.route("/update/:userID").post(update);

module.exports = router;