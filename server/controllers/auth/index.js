const bcrypt = require("bcrypt");
const User = require("../../models/User");
const cloudinary = require("../../config/cloudinary");
const generateToken = require("../../utils/generateToken");
const randomAvatar = require("../../utils/randomAvatar");

async function userSignUp(req, res) {
  const { fullname, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .send({ success: false, message: "Email is registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      fullname,
      email,
      password: hashedPassword,
      avatar: randomAvatar(),
    });

    res.status(201).send({
      success: true,
      message: "Registration is successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Registration is failed",
      error: error.message,
    });
  }
}

async function userSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "Email is not registered" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).send({ message: "Password is wrong" });
    }

    const payload = {
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
      avatar: user.avatar,
    };

    generateToken(payload, res);

    res
      .status(200)
      .send({ success: true, message: "Login is success", data: payload });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Login is failed",
      error: error.message,
    });
  }
}

async function userSignOut(req, res) {
  res.clearCookie("token");

  return res.status(200).send({ success: true, message: "Logout is success" });
}

async function updateUserProfile(req, res) {
  try {
    const { avatar } = req.body;
    const userId = req.user;
    console.log(avatar);

    if (!avatar) {
      return res
        .status(400)
        .send({ success: false, message: "Image is require" });
    }

    const uploadData = await cloudinary.uploader.upload(avatar);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: uploadData.secure_url },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile update is success",
      data: updatedUser.avatar,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Profile upadate is failed",
      error: error.message,
    });
  }
}

async function checkUserAuth(req, res) {
  try {
    res.status(200).send({ data: req.user });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

module.exports = {
  userSignUp,
  userSignIn,
  userSignOut,
  updateUserProfile,
  checkUserAuth,
};
