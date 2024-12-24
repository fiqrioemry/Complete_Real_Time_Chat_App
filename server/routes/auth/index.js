const express = require("express");
const {
  userSignUp,
  userSignIn,
  userSignOut,
  updateUserProfile,
  checkUserAuth,
} = require("../../controllers/auth");
const isAuthenticate = require("../../middleware/validation");
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.post("/signout", userSignOut);
router.get("/check", isAuthenticate, checkUserAuth);
router.put("/update-profile", isAuthenticate, updateUserProfile);

module.exports = router;
