const expressAsyncHandler = require("express-async-handler");
const valdiateMongodbId = require("../../config/ValidateMongodbID");
const CategoryModel = require("../../model/Category/category");

const createCategory = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { title } = req.body;
  try {
    const category = await CategoryModel.create({
      user,
      title,
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

const getAllCategories = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await CategoryModel.find({}).sort("-createdAt");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

const getSingleCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  valdiateMongodbId(id);
  try {
    const category = await CategoryModel.findById(id);
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

const updateCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      {
        title: title,
      },
      {
        new: true,
      }
    );
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

const deleteCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findByIdAndDelete(id);
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCategory,
  getAllCategories,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
};
