import io from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL);

const socketConnection = () => {
  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });
};

const sendMessage = (eventName, message) => {
  socket.emit(eventName, message);
};

const receivedMessage = (eventName, callback) => {
  socket.on(eventName, callback);
};

export { socketConnection, sendMessage, receivedMessage };
