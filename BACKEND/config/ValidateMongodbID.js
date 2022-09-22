const mongoose = require("mongoose");

const valdiateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("User id is not valid or found");
  }
};

module.exports = valdiateMongodbId;