const Comment = require("../../models/Comment/Comment");
const User = require("../../models/User/User");
const Post = require("../../models/Post/Post");

// get all comments
const getAllCommentsForPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("user")
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      status: "success",
      data: comments,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// create new comment
const createComment = async (req, res, next) => {
  const { userId, description } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(userId);
    const comment = await Comment.create({
      post: post._id,
      user: userId,
      description: description,
    });
    post.comments.push(comment._id);
    user.comments.push(comment._id);
    post.save({ validateBeforeSave: false });
    user.save({ validateBeforeSave: false });
    res.json({
      status: "success",
      data: "comment created",
    });
  } catch (error) {
    next(new Error(error));
  }
};

// update comment
const updateComment = async (req, res, next) => {
  const { description } = req.body;
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user.toString() !== req.userAuth.toString()) {
      return next(new Error("You are not allowed to update this comment"));
    }
    const newComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { description },
      { new: true, runValidators: true }
    );

    res.json({
      status: "success",
      msg: "comment updated",
      data: newComment,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// delete comment
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user.toString() !== req.userAuth.toString()) {
      return next(new Error("You are not allowed to delte this comment"));
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "comment deleted",
    });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  getAllCommentsForPost,
  createComment,
  updateComment,
  deleteComment,
};
