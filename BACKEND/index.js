const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/users/usersRoutes");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

app.use("/api/users", userRoutes);

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
