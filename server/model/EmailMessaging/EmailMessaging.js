const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    fromEmail: {
      type: String,
      required: true,
    },
    toEmail: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFlaged: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const EmailMessage = mongoose.model("EmailMessage", emailSchema);

module.exports = EmailMessage;
