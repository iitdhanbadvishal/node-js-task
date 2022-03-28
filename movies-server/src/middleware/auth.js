const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const Movie = require("../models/movies");
const { getMonth, getYear } = require("../utils/utils");

const { JWT_SECRET } = process.env;

module.exports = {
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());

    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
  roleIdentity: async (req, res, next) => {
    const { userId, role } = req.payload;

    if (role === "basic") {
      let numberOfMovieCreatedPerMonth = await Movie.count({
        userId: userId,
        month: getMonth(),
        year: getYear(),
      });

      if (numberOfMovieCreatedPerMonth >= 5) {
        return res.status(400).json({
          message: `You are a basic user, you can create only 5 movies per month`,
        });
      }
    }
    next();
  },
};
