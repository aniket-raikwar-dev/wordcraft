const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
  getAllCommentsForPost,
} = require("../../controllers/Comment/commentController");
const isLogin = require("../../middlewares/isLogin");
const commentRouter = express.Router();

commentRouter.get("/:id", isLogin, getAllCommentsForPost);

commentRouter.post("/create/:id", isLogin, createComment);

commentRouter.put("/update/:id", isLogin, updateComment);

commentRouter.delete("/delete/:id", isLogin, deleteComment);

module.exports = commentRouter;
