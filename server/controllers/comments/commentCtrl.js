const expressAsyncHandler = require("express-async-handler");
const valdiateMongodbId = require("../../config/ValidateMongodbID");
const CommentModel = require("../../model/comment/Comment");

const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { postId, description } = req.body;

  try {
    const comment = await CommentModel.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const getAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await CommentModel.find({}).sort("-created");
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

const getSingleCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  valdiateMongodbId(id);
  try {
    const comment = await CommentModel.findById(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const updateCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const comment = await CommentModel.findByIdAndUpdate(
      id,
      {
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const deleteCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  valdiateMongodbId(id);
  try {
    const comment = await CommentModel.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCommentCtrl,
  getAllCommentsCtrl,
  getSingleCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
};
