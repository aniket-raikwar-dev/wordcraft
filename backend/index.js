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
// app.use(cors());
app.use(
  cors({
    credentials: true, //if you are using authentication.
    origin: "https://wordcraft-weld.vercel.app", // if line above is true, then this CANNOT be '*'
  })
);

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
