const getTokenFromHeader = require("../utils/getTokenFromHeader");
const tokenVerification = require("../utils/tokenVerification");

const isLogin = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = tokenVerification(token);
  req.userAuth = decodedUser.id;
  if (!decodedUser) {
    return next(new Error("You are not logged in!"));
  }

  next();
};

module.exports = isLogin;
