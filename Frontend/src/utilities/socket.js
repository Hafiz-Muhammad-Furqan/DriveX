import io from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL);

const socketConnection = () => {
  console.log("hello socket");

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

const updateLocation = (userId) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        socket.emit("update-location-captain", {
          userId,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (error) => {
        console.log("Error fetching location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

export {
  socketConnection,
  sendMessage,
  receivedMessage,
  updateLocation,
  socket,
};
