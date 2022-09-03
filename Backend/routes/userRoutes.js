const express = require("express");
const app = express();
const {isAuthenticatedUser , authorizeRoles} = require("../middleware/auth")
const { registerUser, loginUser, logout, forgotPaassword, resetPassword, getUserDetails, UpdatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const router = express.Router();
app.use(express.json());

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPaassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser,getUserDetails)

router.route("/password/update").put(isAuthenticatedUser,UpdatePassword);

router.route("/me/update").put(isAuthenticatedUser,updateProfile);

router
    .route("/admin/users")
    .get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);

router
    .route("/admin/user/:id")
    .get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);



module.exports = router;

