const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const User = require("./Model/userschema.js");
const book = require("./Model/Book.js");
const userbook = require("./Model/userbook.js");
const mongoose = require("mongoose");
const cors = require("cors");
// import jwt token
const jwt = require("jsonwebtoken");

const SecretKey = "secretkey";

app.use(cors());

// create resgistation api
app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    console.log(user);
    // how to encreatp password in nodejs

    return res
      .status(201)
      .json({ user: user, message: "User created", error: "" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Something went wrong" });
  }
});

// create login api
app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const users = await User.find();

    for (let i = 0; i < users.length; i++) {
      if (users[i].Email == Email && users[i].Password == Password) {
        if (users[i].type == "admin") {
          token = jwt.sign({ id: users[i]._id }, SecretKey);
          return res.status(200).json({
            message: "login successfull",
            type: "admin",
            token: token,
            users: users[i].Email,
            id: users[i]._id,
          });
        }
        if (users[i].type == "user") {
          token = jwt.sign({ id: users[i]._id }, SecretKey);
          return res.status(200).json({
            message: "login successfull",
            type: "user",
            token: token,
            users: users[i].Email,
            id: users[i]._id,
          });
        }
      }
    }
    return res
      .status(401)
      .json({ message: "Invalid credentials", type: "", status: 401 });
  } catch (error) {
    console.log(error);
  }
});

// create book api

app.post("/book", async (req, res) => {
  try {
    console.log(req.body);
    const book1 = await book.create(req.body);

    return res
      .status(201)
      .json({ book: book1, message: "Book created", error: "" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// create get book api
app.get("/books", async (req, res) => {
  try {
    const books = await book.find();
    return res.status(200).json({ books: books, message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// update book api by id
app.put("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { BookName, AuthorName, Price, type } = req.body;
    const books = await book.findByIdAndUpdate(id, {
      BookName: BookName,
      AuthorName: AuthorName,
      Price: Price,
      type: type,
    });
    return res.status(200).json({ books: books, message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// delete book api by id
app.delete("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const books = await book.findByIdAndDelete(id);
    return res.status(200).json({ books: books, message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// get book by id
app.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const books = await book.findById(id);
    return res.status(200).json({ books: books, message: "success" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Something went wrong" });
  }
});

// create collectin of book in mongodb of user  when user request for book
app.post("/userbook", async (req, res) => {
  try {
    console.log(req.body);
    const userbooks = await userbook.create(req.body);

    return res
      .status(201)
      .json({ userbooks: userbooks, message: "Book created", error: "" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// get user book by id

app.post("/getuserbook", async (req, res) => {
  try {
    const userbooks = await userbook.find();
    // console.log(userbooks);
    const list = [];
    console.log(req.body.id);
    console.log(userbooks[0].id);
    for (let i = 0; i < userbooks.length; i++) {
      if (userbooks[i].id == req.body.id) {
        list.push(userbooks[i]);
      }
    }

    console.log("teste");
    console.log(list);
    return res.status(200).json({ userbooks: list, message: "success" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Something went wrong" });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to mongoDB", err);
  });
