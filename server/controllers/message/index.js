const User = require("../../models/User");
const Message = require("../../models/Message");

const { getReceiverSocketId, io } = require("../../config/socket.js");
const uploadMediaToCloudinary = require("../../utils/uploadMediaToCloudinary.js");

async function getUserInformation(req, res) {
  try {
    const { userId } = req.user;

    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    res.status(200).send({ success: true, data: filteredUsers });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve user information",
      error: error.message,
    });
  }
}

async function getUserMessages(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const { userId } = req.user;
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: userId },
      ],
    });

    res.status(200).send({ success: true, data: messages });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve user messages",
      error: error.message,
    });
  }
}

async function sendUserMessage(req, res) {
  try {
    const { text, file } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.userId;

    let imageUrl;
    if (file) {
      const uploadResponse = await uploadMediaToCloudinary(file.path);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res
      .status(201)
      .send({ success: true, message: "Message is send", data: newMessage });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
}

module.exports = { getUserInformation, getUserMessages, sendUserMessage };
