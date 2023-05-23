const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const uploadMiddleware = multer({ dest: "uploads/" });

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const salt = bcrypt.genSaltSync(10);

try {
  mongoose.connect(
    "mongodb+srv://waglesudip8:07Wqwg7Yji67aHBU@cluster0.yf99af4.mongodb.net/?retryWrites=true&w=majority"
  );
} catch (e) {
  console.log(e);
}

// 07Wqwg7Yji67aHBU
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(300).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(333).json(e);
  }
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.get("/user/:posts", async (req, res) => {
  const { posts } = req.params;
  try {
    const refo = await Post.find({ author: posts }).sort({ createdAt: -1 });
    if (refo) {
      res.json(refo);
      // console.log(posts);
    }
    // res.json(User.findOne({ username: user }));
  } catch (e) {
    res.status(304).json("bloggs not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, "segg@#$23r", (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(10)
  );
});

app.post("/postslike/:ide/:rer", async (req, res) => {
  const { token } = req.cookies;
  const { ide, rer } = req.params;
  const fg = await Post.findById(ide);
  console.log(ide);
  console.log(rer);

  jwt.verify(token, "segg@#$23r", (err, info) => {
    if (fg.likes.includes(rer) && rer != undefined) {
      return res
        .status(400)
        .json({ message: "User has already liked the post" });
    } else {
      fg.likes.push(rer);
      fg.save();
      res.json({ message: "Post liked successfully" });
    }
  });
});

app.post("/postscom/:idd/:er/:qw", async (req, res) => {
  const { token } = req.cookies;
  const { idd, er, qw } = req.params;
  const fgo = await Post.findById(idd);

  jwt.verify(token, "segg@#$23r", (err, info) => {
    fgo.comments.push(qw + "   :   " + er);
    fgo.save();
    res.json({ message: "comment successfully" });
  });
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, "segg@#$23r", {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
      likes: [],
      comments: [],
    });
    res.json(postDoc);
  });
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, "segg@#$23r", {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;

    const updateObj = {};
    if (title) updateObj.title = title;
    if (summary) updateObj.summary = summary;
    if (content) updateObj.content = content;

    Post.findOneAndUpdate({ _id: id }, { $set: updateObj }, { new: true })
      .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while updating the post." });
      });
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.get("/posts/:user", async (req, res) => {
  const { user } = req.params;
  try {
    const ref = await User.findOne({ username: user });
    if (ref) {
      res.json(ref);
      // console.log(user);
    }
    // res.json(User.findOne({ username: user }));
  } catch (e) {
    res.status(304).json("user doesnot exit");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.findOne({ username });

    // res.json(info);
    const info = await User.findOne({ username });

    const pass = bcrypt.compareSync(password, info.password);
    // res.json(pass);

    if (pass) {
      // logged in
      jwt.sign({ username, id: info._id }, "segg@#$23r", (err, token) => {
        if (err) throw err;
        // res.json(token);
        res.cookie("token", token).json({
          id: info._id,
          username,
        });
      });
    }
  } catch (e) {
    res.status(400).json("wrong credentials");
  }
});

const server = app.listen(4000, () => {
  console.log("Server started and listening on port 4000");
});

const timeout = setTimeout(() => {
  server.close(() => {
    console.log("Server closed after timeout");
  });
}, 6000000);
