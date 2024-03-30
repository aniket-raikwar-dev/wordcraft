const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  userDeleteCtrl,
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
} = require("../../controllers/User/userController");
const isLogin = require("../../middlewares/isLogin");
const storage = require("../../config/cloudinaryConnection");
const userRouter = express.Router();
const multer = require("multer");

// instance of multer
const upload = multer({ storage });

// POST: user register
userRouter.post("/register", userRegisterCtrl);

// POST: user login
userRouter.post("/login", userLoginCtrl);

// GET: get all user
userRouter.get("/all", usersCtrl);

// GET: user profile
userRouter.get("/profile", isLogin, userProfileCtrl);

// GET: get single user profile
userRouter.get("/profile/:id", isLogin, getSingleUserDetail);

// GET: who viewed my profile
userRouter.get("/profile-viewer/:id", isLogin, whoViewedMyProfileCtrl);

// GET: user want to following
userRouter.get("/following/:id", isLogin, userFollowingCtrl);

// GET: user want to unfollewed
userRouter.get("/unfollow/:id", isLogin, userUnfollowCtrl);

// GET: user blocked
userRouter.get("/blocked/:id", isLogin, userBlockedCtrl);

// GET: user unblocked
userRouter.get("/unblocked/:id", isLogin, userUnblockedCtrl);

// PUT: user update
userRouter.put("/update", isLogin, upload.single("profile"), userUpdateCtrl);

// PUT: user update
userRouter.put("/update-password", isLogin, userPasswordUpdateCtrl);

//DELETE: delete account
userRouter.delete("/delete-account", isLogin, deleteUserAccountCtrl);

// POST: user profile photo update
userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  userProfilePhotoUpdateCtrl
);

module.exports = userRouter;
