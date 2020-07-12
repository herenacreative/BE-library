const jwt = require("jsonwebtoken");
const config = require("../configs/server");
const helper = require("../helpers/index");

module.exports = {
  verifyJwtToken: function (req, res, next) {
    try {
      const splitToken = req.headers.authorization.split(" ");
      let token = "";
      if (splitToken.length > 1) {
        token = splitToken.pop();
      } else {
        token = req.headers.authorization;
      }

      const decoded = jwt.verify(token, config.jwtSecretKey);
      req.decodedToken = decoded;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return helper.response(res, "fail", "Token expired!", 401);
      }
      return helper.response(res, "fail", "Invalid token!", 401);
    }
  },

  verifyJwtRefreshToken: function (req, res, next) {
    const splitToken = req.headers.authorization.split(" ");
    let token = "";
    if (splitToken.length > 1) {
      token = splitToken.pop();
    } else {
      token = req.headers.authorization;
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecretKeyNew);
      req.decodedRefreshToken = decoded;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return helper.response(res, "fail", "Token expired!", 401);
      }
      return helper.response(res, "fail", "Invalid token!", 401);
    }
  },

  authorize: (roles) =>
    function (req, res, next) {
      // roles param can be a single role string (e.g. Role.User or 'User')
      // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
      const checkRole = req.headers.authorization;
      try {
        const decoded = jwt.verify(checkRole, config.jwtSecretKey);
        // req.decodedToken = decoded
        if (roles.includes(decoded.role)) {
          next();
        } else {
          return helper.response(res, null, "you dont have access", 403);
        }
      } catch (error) {
        if (roles.length && !roles.includes(req.decodedToken.role)) {
          return helper.response(res, "fail", "Token expired!", 401);
        }
      }
    },
};
