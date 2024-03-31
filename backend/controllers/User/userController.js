const User = require("../../models/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const Category = require("../../models/Category/Catgeory");
const Comment = require("../../models/Comment/Comment");
const Post = require("../../models/Post/Post");

// POST -> USER REGISTER
const userRegisterCtrl = async (req, res, next) => {
  const { email, password, name, username } = req.body;
  console.log("register: ", name, username, email, password);
  try {
    // check email is exist
    const isUserFound = await User.findOne({ email });
    if (isUserFound) {
      return next(new Error("Email already has been registered."));
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    res.json({
      status: 200,
      msg: "user is successfully registered.",
      data: user,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(new Error(error));
  }
};

// POST -> USER LOGIN
const userLoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isUserFound = await User.findOne({ email });
    if (!isUserFound) {
      return next(new Error("Invalid Login Credentials"));
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserFound.password
    );
    if (!isPasswordMatch) {
      return next(new Error("Invalid Login Credentials"));
    }
    res.json({
      status: 200,
      msg: "user is successfully login.",
      data: isUserFound,
      token: generateToken(isUserFound._id),
    });
  } catch (error) {
    next(new Error(error));
  }
};

// GET -> All USERs
const usersCtrl = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).exec();
    res.json({
      status: 200,
      msg: "all user success",
      data: users,
    });
  } catch (error) {
    next(new Error(error));
  }
};
// GET -> WHO VIEWED MY PROFILE
const whoViewedMyProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const userWhoViewed = await User.findById(req.userAuth);
    if (user && userWhoViewed) {
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() == userWhoViewed._id.toString()
      );

      if (isUserAlreadyViewed) {
        return next(new Error("You already Viewed!"));
      } else {
        user.viewers.push(userWhoViewed._id);
        await user.save();
        res.json({
          status: 200,
          data: "You have successfully viewed profile.",
        });
      }
    }
  } catch (error) {
    next(new Error(error));
  }
};

// GET -> SINGLE USER DETAIL
const getSingleUserDetail = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);
    res.json({
      status: 200,
      msg: "Single User Profile",
      data: users,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// GET -> USER FOLLOWING
const userFollowingCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const author = await User.findById(req.userAuth);
    if (user && author) {
      const isUserAlreadyFollowing = user.followers.find(
        (follower) => follower.toString() === author._id.toString()
      );

      if (isUserAlreadyFollowing) {
        // if already following then unfollow
        user.isFollowed = false;
        user.followers = user.followers.filter(
          (follower) => follower.toString() !== author._id.toString()
        );

        author.following = author.following.filter(
          (following) => following.toString() !== user._id.toString()
        );
      } else {
        // if not, then followed
        user.isFollowed = true;
        user.followers.push(author._id);
        author.following.push(user._id);
      }
      await user.save();
      await author.save();
      res.json({
        status: 200,
        data: "You have successfully followed user.",
      });
    }
  } catch (error) {
    next(new Error(error));
  }
};

// GET -> USER UNFOLLOWED
const userUnfollowCtrl = async (req, res, next) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const userWhoWantToUnfollewed = await User.findById(req.userAuth);

    if (userToUnfollow && userWhoWantToUnfollewed) {
      const isUserAlreadyUnfollowed = userToUnfollow.followers.find(
        (follower) =>
          follower.toString() === userWhoWantToUnfollewed._id.toString()
      );

      if (!isUserAlreadyUnfollowed) {
        return next(new Error("User already unfollowed"));
      } else {
        userToUnfollow.followers = userToUnfollow.followers.filter(
          (follower) =>
            follower.toString() !== userWhoWantToUnfollewed._id.toString()
        );

        userWhoWantToUnfollewed.following =
          userWhoWantToUnfollewed.following.filter(
            (following) =>
              following.toString() !== userToUnfollow._id.toString()
          );

        userToUnfollow.save();
        userWhoWantToUnfollewed.save();
        res.json({
          status: 200,
          data: "User Unfollowed successfully",
        });
      }
    }
  } catch (error) {
    next(new Error(error));
  }
};

// GET -> USER PROFILE
const userProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: 200,
      msg: "User Profile ",
      data: user,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// GET -> USER UNBLOCKED
const userUnblockedCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: 200,
      msg: "User Unblocked ",
      data: user,
    });
  } catch (error) {
    res.json({
      status: 400,
      error: error,
    });
  }
};

// GET -> USER BLOCKED
const userBlockedCtrl = async (req, res, next) => {
  try {
    const userToBeBlocked = await User.findById(req.params.id);
    const userWhoWantToBlocked = await User.findById(req.userAuth);

    if (userToBeBlocked && userWhoWantToBlocked) {
      const isUserAlreadyBlocked = userWhoWantToBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeBlocked._id.toString()
      );

      if (isUserAlreadyBlocked) {
        return next(new Error("You are already blocked!"));
      }

      userWhoWantToBlocked.blocked.push(userToBeBlocked._id);
      await userWhoWantToBlocked.save();
      res.json({
        status: 200,
        msg: "User Blocked Successfully!",
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      error: error,
    });
  }
};

// PUT -> USER UPDATE
const userUpdateCtrl = async (req, res, next) => {
  const { name, username, bio, location, link } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.userAuth,
      {
        name,
        username,
        profilePhoto: req?.file ? req.file.path : "",
        bio,
        location,
        link,
      },
      { new: true, runValidators: false }
    );
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// PUT -> USER UPDATE PASSWORD
const userPasswordUpdateCtrl = async (req, res, next) => {
  const { password } = req.body;
  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.findByIdAndUpdate(
        req.userAuth,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      res.json({
        status: "success",
        data: "passsword update success",
      });
    } else {
      next(new Error("please provide password field"));
    }
  } catch (error) {
    next(new Error(error));
  }
};

// DELETE : Delete User Account
const deleteUserAccountCtrl = async (req, res, next) => {
  try {
    const userToDelete = await User.findById(req.userAuth);
    await Post.deleteMany({ user: req.userAuth });
    await Comment.deleteMany({ user: req.userAuth });
    await Category.deleteMany({ user: req.userAuth });
    await userToDelete.deleteOne();
    res.json({
      status: "success",
      msg: "User Deleted Successfully!",
    });
  } catch (error) {
    next(new Error(error));
  }
};

// POST -> USER PROFILE PHOTO UPDATE
const userProfilePhotoUpdateCtrl = async (req, res, next) => {
  try {
    const userToUpdate = await User.findById(req.userAuth);
    if (!userToUpdate) {
      return next(new Error("User not found.", 403));
    }
    if (userToUpdate.isBlocked) {
      return next(
        new Error("Action not allowed, You account is blocked.", 403)
      );
    }
    if (req.file) {
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        { new: true }
      );
      res.json({
        status: 200,
        data: "profile photo updated.",
      });
    }
  } catch (error) {
    next(new Error(error.message));
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  userUpdateCtrl,
  userProfilePhotoUpdateCtrl,
  whoViewedMyProfileCtrl,
  userFollowingCtrl,
  userUnfollowCtrl,
  userBlockedCtrl,
  userUnblockedCtrl,
  userPasswordUpdateCtrl,
  deleteUserAccountCtrl,
  getSingleUserDetail,
};
