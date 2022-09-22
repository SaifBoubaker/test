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
} = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", userLoginCtrl);
userRoutes.get("/", authMiddleware, getUsersCtrl);
userRoutes.get("/profile", authMiddleware, userProfileCtrl);
userRoutes.put("/:id", authMiddleware, updateProfileCtrl);
userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);

userRoutes.delete("/:id", deleteUserCtrl);
userRoutes.get("/:id", getUserCtrl);

module.exports = userRoutes;
