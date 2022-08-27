const express = require("express");
const app = express();
const { registerUser, loginUser, logout, forgotPaassword } = require("../controllers/userController");
const router = express.Router();
app.use(express.json());

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPaassword);

module.exports = router;

