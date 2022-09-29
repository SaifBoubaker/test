const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const UserModel = require("../../model/user/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (!req?.headers?.authorization) {
    throw new Error("There is no token attached to the header");
  }
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await UserModel.findById(decoded?.id).select("-password");
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized token expired, Login again");
    }
  }
});

module.exports = authMiddleware;
