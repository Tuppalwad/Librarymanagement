const mongoos = require("mongoose");
const Schema = mongoos.Schema(
  // Schema is a class
  {
    id: {
      type: String,
      required: true,
    },

    BookName: {
      type: String,
    },
    AuthorName: {
      type: String,
    },
    Price: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);
const userbooks = mongoos.model("userbook", Schema);
module.exports = userbooks;
