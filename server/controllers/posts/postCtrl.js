const PostModel = require("../../model/post/post");
const UserModel = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const valdiateMongodbId = require("../../config/ValidateMongodbID");
const badwords = require("bad-words");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRETKEY,
});

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const { title, description, category, image } = req.body;
  valdiateMongodbId(id);

  const check = new badwords();
  const isProfane = check.isProfane(title, description);
  if (isProfane) {
    await UserModel.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    throw new Error("You have been blocked due to using bad words");
  }

  try {
    const img = await cloudinary.uploader.upload(image, {
      folder: "images",
      resource_type: "auto",
    });

    const post = await PostModel.create({
      title,
      description,
      category,
      image: img?.secure_url,
      user: id,
    });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const getAllPosts = expressAsyncHandler(async (req, res) => {
  const hasCategory = req.query.category;
  try {
    if (hasCategory) {
      const posts = await PostModel.find({ category: hasCategory }).populate(
        "user"
      );
      res.json(posts);
    } else {
      const posts = await PostModel.find({}).populate("user");
      res.json(posts);
    }
  } catch (error) {
    res.json(error);
  }
});

const getPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  valdiateMongodbId(id);
  try {
    const post = await PostModel.findById(id)
      .populate("user")
      .populate("comments");
    await PostModel.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  valdiateMongodbId(id);
  try {
    const post = await PostModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: _id,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  valdiateMongodbId(id);

  try {
    const post = await PostModel.findByIdAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const toggleLikeCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const { postId } = req.body;
  valdiateMongodbId(postId);

  const post = await PostModel.findById(postId);

  const alreadyDisliked = post.dislikes.find(
    (userId) => userId.toString() === id.toString()
  );

  if (alreadyDisliked) {
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { dislikes: id },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }

  const isLiked = post.likes.find((userId) => userId.toString() === id);

  if (isLiked) {
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: id },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } else {
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: { likes: id },
        isLiked: true,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }
});

const toggleDislikedCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const { postId } = req.body;
  valdiateMongodbId(postId);

  const post = await PostModel.findById(postId);

  const alreadyLiked = post.likes.find(
    (userId) => userId.toString() === id.toString()
  );

  if (alreadyLiked) {
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: id },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.json(post);
  }

  const alreadyDisliked = post.dislikes.find(
    (userId) => userId.toString() === id.toString()
  );

  if (alreadyDisliked) {
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { dislikes: id },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } else {
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: { dislikes: id },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

module.exports = {
  createPostCtrl,
  getAllPosts,
  getPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleLikeCtrl,
  toggleDislikedCtrl,
};
