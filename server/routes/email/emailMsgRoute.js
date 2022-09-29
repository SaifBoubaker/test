const express = require("express");
const { sendEmailMsgCtrl } = require("../../controllers/EmailMsg/emailMsgCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const emailRoute = express.Router();

emailRoute.post("/", authMiddleware, sendEmailMsgCtrl);

module.exports = emailRoute;
