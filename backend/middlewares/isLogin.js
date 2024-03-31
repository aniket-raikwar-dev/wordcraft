const getTokenFromHeader = require("../utils/getTokenFromHeader");
const tokenVerification = require("../utils/tokenVerification");

const isLogin = (req, res, next) => {
  const token = getTokenFromHeader(req);
  console.log("token: ", token);
  const decodedUser = tokenVerification(token);
  console.log("decodedUser: ", decodedUser.id);
  req.userAuth = decodedUser.id;
  if (!decodedUser) {
    return next(new Error("You are not logged in!"));
  }

  next();
};

module.exports = isLogin;
