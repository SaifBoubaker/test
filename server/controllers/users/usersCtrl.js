const UserModel = require("../../model/user/User");
const fs = require("fs");
const dotenv = require("dotenv");
const crypto = require("crypto");
const expressAsyncHandler = require("express-async-handler");
const valdiateMongodbId = require("../../config/ValidateMongodbID");
const generateToken = require("../../middlewares/token/generateToken");
const User = require("../../model/user/User");
const sgMail = require("@sendgrid/mail");
const cloudinaryUploadImg = require("../../config/Cloudinary");

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const oldUser = await UserModel.findOne({ email });
  if (oldUser) {
    throw new Error("User already exists");
  }

  try {
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.json({ newUser, token: generateToken(newUser._id) });
  } catch (error) {
    res.json(error);
  }
});

const userLoginCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await UserModel.findOne({ email });
  if (!oldUser) {
    throw new Error(`You need to register first`);
  }
  if (oldUser && (await oldUser.isPasswordMatched(password))) {
    res.json({
      _id: oldUser?._id,
      firstName: oldUser?.firstName,
      lastName: oldUser?.lastName,
      email,
      profilePhoto: oldUser?.profilePhoto,
      isAdmin: oldUser?.isAdmin,
      token: generateToken(oldUser?._id),
    });
  } else {
    res.status(401);
    throw new Error(`Login credentials are not valid`);
  }
});

const getUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  valdiateMongodbId(id);
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

const getUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  valdiateMongodbId(id);
  try {
    const user = await UserModel.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  valdiateMongodbId(id);
  try {
    const userProfile = await UserModel.findById(id).populate("posts");
    res.json(userProfile);
  } catch (error) {
    res.json(error);
  }
});

const updateProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  valdiateMongodbId(_id);
  const { firstName, lastName, email, bio } = req.body;
  try {
    const oldUser = await UserModel.findByIdAndUpdate(
      _id,
      {
        firstName,
        lastName,
        email,
        bio,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(oldUser);
  } catch (error) {
    res.json(error);
  }
});

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.user;
  const { password } = req.body;
  valdiateMongodbId(id);
  const user = await User.findById(id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

const followingUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.user;
  const { followedId } = req.body;

  const targetUser = await UserModel.findById(followedId);

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === id.toString()
  );

  if (alreadyFollowing) {
    throw new Error("You have already followed this user");
  }

  await UserModel.findByIdAndUpdate(
    followedId,
    {
      $push: { followers: id },
      isFollowingl: true,
    },
    { new: true }
  );
  await UserModel.findByIdAndUpdate(
    id,
    {
      $push: { following: followedId },
    },
    { new: true }
  );

  res.json("You have successfully followed this user");
});

const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.user;
  const { unFollowedId } = req.body;

  const targetUser = await UserModel.findById(unFollowedId);

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === id.toString()
  );

  if (!alreadyFollowing) {
    throw new Error("You are already not following this user");
  }

  await UserModel.findByIdAndUpdate(
    unFollowedId,
    {
      $pull: { followers: id },
      isFollowing: false,
    },
    {
      new: true,
    }
  );

  await UserModel.findByIdAndUpdate(
    id,
    {
      $pull: { following: unFollowedId },
    },
    {
      new: true,
    }
  );

  res.json("You have successfully unfollowed this user");
});

const blockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  valdiateMongodbId(id);

  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json(user);
});

const unBlockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  valdiateMongodbId(id);
  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json(user);
});

const generateVerificationTokenCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await UserModel.findById(id);
  try {
    const verificationToken = await user.createAccountVerificationToken();
    await user.save();

    const resetUrl = `Verify you account by clicking on this link <a href="http://localhost:3000/verifiy-account/${verificationToken} " >Click here</a>`;
    const msg = {
      to: "saifstreaming2020@gmail.com",
      from: "saif.boubaker.contact@gmail.com",
      subject: "Hello there",
      html: resetUrl,
    };
    await sgMail.send(msg);
    res.json(resetUrl);
  } catch (error) {
    res.json(error);
  }
});

const accountVerificationCtrl = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await UserModel.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new Error("Token expired, try again ");
  }
  user.isAccountVerified = true;
  user.accountVerificationToken = undefined;
  user.accountVerificationTokenExpires = undefined;
  await user.save();
  res.json(user);
});

const forgetPasswordToken = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();

    const resetUrl = `Reset your password by clicking on this link <a href="http://localhost:3000/verifiy-account/${token} " >Click here</a>`;
    const msg = {
      to: "saifstreaming2020@gmail.com",
      from: "saif.boubaker.contact@gmail.com",
      subject: "Reset Password",
      html: resetUrl,
    };
    const emailMsg = await sgMail.send(msg);
    res.json({
      message: `A verification message is successfully sent to ${user?.email}`,
    });
  } catch (error) {
    res.json(error);
  }
});

const passwordResetCtrl = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: new Date() },
  });
  if (!user) {
    throw new Error("token expired");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();
  res.json("password changed");
});

const profilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const localPath = `public/images/profile/${req.file.filename}`;
  const img = await cloudinaryUploadImg(localPath);
  const user = await UserModel.findByIdAndUpdate(
    _id,
    {
      profilePhoto: img.url,
    },
    { new: true }
  );
  res.json(user);
  fs.unlinkSync(localPath);
});

module.exports = {
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
  profilePhotoUploadCtrl,
};
