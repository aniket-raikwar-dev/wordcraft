const Post = require("../../models/Post/Post");
const User = require("../../models/User/User");

// POST: create a new post
const createPostCtrl = async (req, res, next) => {
  const { title, description, tags } = req.body;
  try {
    if (!title || !description) {
      return res.status(400).json({
        status: "error",
        message: "Title and Content is Required.",
      });
    }

    const author = await User.findById(req.userAuth);
    if (author) {
      const postCreated = await Post.create({
        title,
        description,
        user: author._id,
        image: req?.file?.path,
        tags: tags.split(","),
      });
      author.posts.push(postCreated);
      await author.save();
      res.json({
        status: "success",
        data: postCreated,
      });
    }
  } catch (error) {
    next(new Error(error));
  }
};

// fetch all posts
const fetchAllPostCtrl = async (req, res, next) => {
  try {
    const userId = req.userAuth;
    let posts = await Post.find({})
      .populate("user")
      .sort({ createdAt: -1 })
      .exec();

    posts = posts.map((post) => {
      const isLiked = post.likes.includes(userId);
      const isBookmarked = post.bookmarks.includes(userId);
      post = post.toObject();
      post.isBookmarked = isBookmarked;
      post.isLiked = isLiked;
      return post;
    });

    res.json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// LIKE and UNLIKE A POST
const toggleLikePostCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const isLiked = post.likes.includes(req.userAuth);
    if (isLiked) {
      post.likes = post.likes?.filter(
        (like) => like.toString() !== req.userAuth.toString()
      );
      await post.save();
      await Post.findByIdAndUpdate(req.params.id, { isLiked: false });
    } else {
      post.likes.push(req.userAuth);
      await post.save();
      await Post.findByIdAndUpdate(req.params.id, { isLiked: true });
    }
    res.json({
      status: "success",
      data: "liked the post",
    });
  } catch (error) {
    next(new Error(error));
  }
};

// BOOKMARK POST METHOD
const toggleBookmarkCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const isBookmarked = post.bookmarks.includes(req.userAuth);
    if (isBookmarked) {
      post.bookmarks = post.bookmarks?.filter(
        (bookmark) => bookmark.toString() !== req.userAuth.toString()
      );
      await post.save();
      await Post.findByIdAndUpdate(req.params.id, { isBookmarked: false });
    } else {
      post.bookmarks.push(req.userAuth);
      await post.save();
      await Post.findByIdAndUpdate(req.params.id, { isBookmarked: true });
    }

    res.json({
      status: "success",
      data: "bookmark the post",
    });
  } catch (error) {
    next(new Error(error));
  }
};

// GET : single Post
const postDetailCtrl = async (req, res, next) => {
  try {
    const userId = req.userAuth;
    let post = await Post.findById(req.params.id)
      .populate("user")
      .populate("comments")
      .exec();

    const isLiked = post.likes.includes(userId);
    const isBookmarked = post.bookmarks.includes(userId);
    post = post.toObject();
    post.isLiked = isLiked;
    post.isBookmarked = isBookmarked;

    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// DELETE : single Post
const deletePostCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.userAuth.toString()) {
      next(new Error("You are not allowed to delete"));
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "post deleted successfully",
    });
  } catch (error) {
    next(new Error(error));
  }
};

// UPDATE : single Post
const updatePostCtrl = async (req, res, next) => {
  const { title, description, tags } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.userAuth.toString()) {
      next(new Error("You are not allowed to update"));
    }
    await Post.findByIdAndUpdate(req.params.id, {
      title,
      description,
      image: req?.file?.path,
      tags: tags.split(","),
    });
    res.json({
      status: "success",
      data: "post updated successfully",
    });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  createPostCtrl,
  toggleLikePostCtrl,
  fetchAllPostCtrl,
  postDetailCtrl,
  deletePostCtrl,
  updatePostCtrl,
  toggleBookmarkCtrl,
};
