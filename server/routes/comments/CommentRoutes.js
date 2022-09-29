const express = require("express");
const {
  createCommentCtrl,
  getAllCommentsCtrl,
  getSingleCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
} = require("../../controllers/comments/commentCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const commentRoute = express.Router();

commentRoute.post("/", authMiddleware, createCommentCtrl);
commentRoute.get("/", authMiddleware, getAllCommentsCtrl);
commentRoute.get("/:id", authMiddleware, getSingleCommentCtrl);
commentRoute.put("/:id", authMiddleware, updateCommentCtrl);
commentRoute.delete("/:id", authMiddleware, deleteCommentCtrl);

module.exports = commentRoute;
