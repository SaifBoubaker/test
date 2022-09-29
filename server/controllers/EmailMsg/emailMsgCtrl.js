const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const EmailMessage = require("../../model/EmailMessaging/EmailMessaging");
const badwords = require("bad-words");

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  const { _id, email } = req.user;
  const { to, subject, message } = req.body;
  const check = new badwords();
  const isProfane = check.isProfane(subject, message);

  if (isProfane) {
    throw new Error("Email contains profane words");
  }
  try {
    const msg = {
      to,
      subject,
      text: message,
      from: "saif.boubaker.contact@gmail.com",
    };
    await sgMail.send(msg);
    await EmailMessage.create({
      sentBy: _id,
      fromEmail: email,
      toEmail: to,
      message,
      subject,
    });
    res.json("email sent");
  } catch (error) {}
});

module.exports = { sendEmailMsgCtrl };
