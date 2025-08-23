const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "https://drive-x.netlify.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      console.log(data);

      try {
        const { userId, userType } = data;
        console.log(
          `User joining: ${userId}, type: ${userType}, socketId: ${socket.id}`
        );

        if (userType === "user") {
          const user = await userModel.findByIdAndUpdate(
            userId,
            {
              socketId: socket.id,
            },
            { new: true }
          );

          if (user) {
            console.log(`User ${userId} registered with socket ${socket.id}`);
            socket.emit("join-success", { userType, userId });
          } else {
            console.log(`User ${userId} not found`);
            socket.emit("join-error", { message: "User not found" });
          }
        } else if (userType === "captain") {
          const captain = await captainModel.findByIdAndUpdate(
            userId,
            {
              socketId: socket.id,
            },
            { new: true }
          );

          if (captain) {
            console.log(
              `Captain ${userId} registered with socket ${socket.id}`
            );
            socket.emit("join-success", { userType, userId });
          } else {
            console.log(`Captain ${userId} not found`);
            socket.emit("join-error", { message: "Captain not found" });
          }
        }
      } catch (error) {
        console.error("Error in join event:", error);
        socket.emit("join-error", { message: "Registration failed" });
      }
    });

    socket.on("update-location-captain", async (data) => {
      try {
        const { userId, location } = data;
        if (!location || !location.ltd || !location.lng) {
          return socket.emit("error", { message: "Invalid location" });
        }

        const captain = await captainModel.findByIdAndUpdate(
          userId,
          {
            location: {
              ltd: location.ltd,
              lng: location.lng,
            },
          },
          { new: true }
        );

        if (captain) {
          console.log(`Location updated for captain ${userId}`);
        } else {
          console.log(`Captain ${userId} not found for location update`);
        }
      } catch (error) {
        console.error("Error updating location:", error);
        socket.emit("error", { message: "Location update failed" });
      }
    });

    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);

      try {
        await userModel.updateOne(
          { socketId: socket.id },
          { $unset: { socketId: 1 } }
        );
        await captainModel.updateOne(
          { socketId: socket.id },
          { $unset: { socketId: 1 } }
        );
      } catch (error) {
        console.error("Error cleaning up socket ID:", error);
      }
    });
  });
};

const sendMessageToSockedId = (socketId, message) => {
  const { event, data } = message;
  if (io) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket && socket.connected) {
      console.log(`Sending ${event} to socket ${socketId}`);
      io.to(socketId).emit(event, data);
      return true;
    } else {
      console.log(`Socket ${socketId} not found or disconnected`);
      return false;
    }
  } else {
    console.log("socket.io not initialized");
    return false;
  }
};

module.exports = { initializeSocket, sendMessageToSockedId };
