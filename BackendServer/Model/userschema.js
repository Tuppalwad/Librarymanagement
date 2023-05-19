const mongoos = require("mongoose");

const userschama = mongoos.Schema(
  {
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoos.model("User", userschama);
module.exports = User;
