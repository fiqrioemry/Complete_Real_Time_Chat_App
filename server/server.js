require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const { app, server } = require("./config/socket");

// env configure
const PORT = process.env.SERVER_PORT;
const CLIENT_HOST = process.env.CLIENT_HOST;

// support configure
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_HOST,
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
