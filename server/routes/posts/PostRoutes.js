const express = require("express");
const {
  createPostCtrl,
  getAllPosts,
  getPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleLikeCtrl,
  toggleDislikedCtrl,
} = require("../../controllers/posts/postCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const postRoute = express.Router();

postRoute.post(
  "/",
  authMiddleware,
  // photoUpload.single("image"),
  // postImageResize,
  createPostCtrl
);
postRoute.get("/", getAllPosts);
postRoute.get("/:id", getPostCtrl);
postRoute.put("/:id", authMiddleware, updatePostCtrl);
postRoute.delete("/:id", deletePostCtrl);
postRoute.put("/do/likes", authMiddleware, toggleLikeCtrl);
postRoute.put("/do/dislikes", authMiddleware, toggleDislikedCtrl);

module.exports = postRoute;
