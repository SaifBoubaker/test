const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: [true, "Post Title is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "All",
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Author is required"],
    },
    description: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2022/06/15/13/39/man-7263965_960_720.png",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
