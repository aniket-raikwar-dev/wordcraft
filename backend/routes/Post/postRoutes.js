const express = require("express");
const {
  createPostCtrl,
  postDetailCtrl,
  toggleLikePostCtrl,
  fetchAllPostCtrl,
  deletePostCtrl,
  updatePostCtrl,
  toggleBookmarkCtrl,
} = require("../../controllers/Post/postController");
const isLogin = require("../../middlewares/isLogin");
const storage = require("../../config/cloudinaryConnection");
const multer = require("multer");

const postRouter = express.Router();

const upload = multer({ storage });

// POST: create a new post
postRouter.post("/create", isLogin, upload.single("image"), createPostCtrl);

// LIKE POST
postRouter.get("/likes/:id", isLogin, toggleLikePostCtrl);

// GET: Bookmark ths Blog Post
postRouter.get("/bookmark/:id", isLogin, toggleBookmarkCtrl);


// fetch all post
postRouter.get("/all", isLogin, fetchAllPostCtrl);

// GET: get detail information about a post
postRouter.get("/detail/:id", isLogin, postDetailCtrl);


// DELETE: delete a post
postRouter.delete("/delete/:id", isLogin, deletePostCtrl);

// PUT: update a post
postRouter.put("/update/:id", isLogin, upload.single("image"), updatePostCtrl);

module.exports = postRouter;
