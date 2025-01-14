const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async (data) => {
      console.log(data);

      const { userId, userType } = data;
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });
    console.log("client connected" + socket.id);
    socket.on("disconnect", () => {
      console.log("client disconnested" + socket.id);
    });
  });
};
const sendMessageToSockedId = (socketId, message) => {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("socket.io not initialize");
  }
};

module.exports = { initializeSocket, sendMessageToSockedId };
