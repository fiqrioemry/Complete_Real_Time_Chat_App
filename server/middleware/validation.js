const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function isAuthenticate(req, res, next) {
  try {
    console.log(req.cookies);
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized !!! Token is not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.payload.userId) {
      return res.status(401).send({
        message: "Unauthorized !!! Token is invalid",
      });
    }

    req.user = decoded.payload;

    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
