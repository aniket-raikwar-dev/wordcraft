const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { mongoDBConnect } = require("./config/databaseConnection");
const userRouter = require("./routes/User/userRoutes");
const postRouter = require("./routes/Post/postRoutes");
const commentRouter = require("./routes/Comment/commentRoutes");
const categoryRouter = require("./routes/Category/categoryRoutes");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const routeNotFoundError = require("./middlewares/routeNotFoundError");

// intialize app
const app = express();

// Enable CORS for all routes
app.use(cors());

// work like body-parser
app.use(express.json());

// middleware

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/category", categoryRouter);

// error handlers middleware
app.use(globalErrorHandler);
app.use("*", routeNotFoundError);

// database connection
mongoDBConnect();

// listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Server Listening on Port -> ", PORT);
});

app.get("/api", (req, res) => {
  return res.json("API VERSION 1");
});
