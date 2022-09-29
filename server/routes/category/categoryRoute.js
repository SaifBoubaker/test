const express = require("express");
const {
  createCategory,
  getAllCategories,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} = require("../../controllers/category/categoryCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const categryRoute = express.Router();

categryRoute.post("/", authMiddleware, createCategory);
categryRoute.get("/", authMiddleware, getAllCategories);
categryRoute.get("/:id", authMiddleware, getSingleCategoryCtrl);
categryRoute.put("/:id", authMiddleware, updateCategoryCtrl);
categryRoute.delete("/:id", authMiddleware, deleteCategoryCtrl);

module.exports = categryRoute;
