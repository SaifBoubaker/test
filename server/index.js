const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/users/usersRoutes");
const postRoute = require("./routes/posts/PostRoutes");
const commentRoute = require("./routes/comments/CommentRoutes");
const emailRoute = require("./routes/email/emailMsgRoute");
const categryRoute = require("./routes/category/categoryRoute");
const fileupload = require("express-fileupload");
const path = require("path");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(fileupload({ useTempFiles: true }));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/email", emailRoute);
app.use("/api/category", categryRoute);

app.use(express.static(path.join(__dirname, "../", "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "client", "build", "index.html"));
});

app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect `);
  });
