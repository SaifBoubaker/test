const UserModel = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const valdiateMongodbId = require("../../config/ValidateMongodbID");
const generateToken = require("../../middlewares/token/generateToken");
const User = require("../../model/user/User");

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
    const userProfile = await UserModel.findById(id);
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
  const { _id } = req.user;
  const { password } = req.body;
  valdiateMongodbId(_id);
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
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
};
