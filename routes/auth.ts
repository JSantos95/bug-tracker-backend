import express from 'express';
import {
    register,
    login,
    forgotPassword,
    resetPassword,
    allUser,
    getUserById,
    update,
    getAllCoworkersByToken,
    getUserByToken,
} from "../controllers/auth";

const router = express.Router();

router.route("/").get(allUser);
router.route('/:id').get(getUserById);

router.route("/").post(register);
router.route("/login").post(login);
router.route("/update/:userID").post(update);

router.route('/company/:token').get(getAllCoworkersByToken);
router.route('/auth/:token').post(getUserByToken);

router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resetToken").put(resetPassword);

module.exports = router;