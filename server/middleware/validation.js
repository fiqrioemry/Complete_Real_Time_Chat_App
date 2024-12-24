const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticate(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized !!! Token is not found" });
    }
    // Verifikasi token secara synchronous
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).send({
        message: "Unauthorized !!! Token is invalid",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
