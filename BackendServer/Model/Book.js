const mongoos = require("mongoose");
const Schema = mongoos.Schema(
  // Schema is a class
  {
    BookName: {
      type: String,
      required: true,
    },
    AuthorName: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Book = mongoos.model("Book", Schema);
module.exports = Book;
