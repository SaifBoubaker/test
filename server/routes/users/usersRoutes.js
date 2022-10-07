const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  getUsersCtrl,
  deleteUserCtrl,
  getUserCtrl,
  userProfileCtrl,
  updateProfileCtrl,
  updateUserPasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  generateVerificationTokenCtrl,
  accountVerificationCtrl,
  forgetPasswordToken,
  passwordResetCtrl,
} = require("../../controllers/users/usersCtrl");

const authMiddleware = require("../../middlewares/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", userLoginCtrl);
userRoutes.get("/", authMiddleware, getUsersCtrl);
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
userRoutes.put("/:id", authMiddleware, updateProfileCtrl);
userRoutes.put("/do/follow", authMiddleware, followingUserCtrl);
userRoutes.put("/do/block/:id", authMiddleware, blockUserCtrl);
userRoutes.put("/do/unblock/:id", authMiddleware, unBlockUserCtrl);
userRoutes.put("/do/unfollow", authMiddleware, unfollowUserCtrl);
userRoutes.put("/change-password/:id", authMiddleware, updateUserPasswordCtrl);
userRoutes.post("/do/generate-password-token", forgetPasswordToken);
userRoutes.put("/do/reset-password", passwordResetCtrl);
userRoutes.post(
  "/do/generate-verify-email-token",
  authMiddleware,
  generateVerificationTokenCtrl
);
userRoutes.put("/do/verify-account", authMiddleware, accountVerificationCtrl);

userRoutes.delete("/:id", deleteUserCtrl);
userRoutes.get("/:id", authMiddleware, getUserCtrl);

module.exports = userRoutes;
