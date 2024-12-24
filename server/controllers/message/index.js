const User = require("../models/User");
const Message = require("../models/Message");
const cloudinary = require("../../config/cloudinary.js");
const { getReceiverSocketId, io } = "../../config/socket.js";

async function getUserInformation(req, res) {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).send(filteredUsers);
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
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve user messages",
      error: error.message,
    });
  }
}

export const sendUserMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
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

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

module.exports = { getUserInformation, getUserMessages, sendUserMessage };
