const express = require("express");
const {
  getUserMessages,
  sendUserMessage,
  getUserInformation,
} = require("../../controllers//message");
const isAuthenticate = require("../../middleware/validation");
const router = express.Router();

router.get("/:id", isAuthenticate, getUserMessages);
router.get("/users", isAuthenticate, getUserInformation);
router.post("/send/:id", isAuthenticate, sendUserMessage);

module.exports = router;
