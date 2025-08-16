import io from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  transports: ["websocket", "polling"],
  upgrade: true,
  rememberUpgrade: true,
  timeout: 20000,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

console.log("Initializing socket connection");

let isConnected = false;
let registrationStatus = null;

socket.on("connect", () => {
  console.log("Connected to the server:", socket.id);
  isConnected = true;
  registrationStatus = null;
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected from the server:", reason);
  isConnected = false;
  registrationStatus = null;
});

socket.on("join-success", (data) => {
  console.log("Successfully registered:", data);
  registrationStatus = "success";
});

socket.on("join-error", (error) => {
  console.error("Registration failed:", error);
  registrationStatus = "error";
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

socket.on("reconnect", (attemptNumber) => {
  console.log("Reconnected after", attemptNumber, "attempts");
});

socket.on("reconnect_error", (error) => {
  console.error("Reconnection failed:", error);
});

const sendMessage = (eventName, message) => {
  if (!isConnected) {
    console.warn("Socket not connected, queuing message:", eventName);
    socket.once("connect", () => {
      socket.emit(eventName, message);
    });
    return;
  }

  console.log("Sending message:", eventName, message);
  socket.emit(eventName, message);
};

const receivedMessage = (eventName, callback) => {
  socket.on(eventName, callback);
};

const waitForRegistration = (timeout = 5000) => {
  return new Promise((resolve, reject) => {
    if (registrationStatus === "success") {
      resolve(true);
      return;
    }

    if (registrationStatus === "error") {
      reject(new Error("Registration failed"));
      return;
    }

    const timer = setTimeout(() => {
      reject(new Error("Registration timeout"));
    }, timeout);

    const successHandler = () => {
      clearTimeout(timer);
      socket.off("join-success", successHandler);
      socket.off("join-error", errorHandler);
      resolve(true);
    };

    const errorHandler = (error) => {
      clearTimeout(timer);
      socket.off("join-success", successHandler);
      socket.off("join-error", errorHandler);
      reject(new Error(error.message || "Registration failed"));
    };

    socket.once("join-success", successHandler);
    socket.once("join-error", errorHandler);
  });
};

const updateLocation = (userId) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          userId,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          },
        };

        console.log("Updating location:", locationData);
        sendMessage("update-location-captain", locationData);
      },
      (error) => {
        console.log("Error fetching location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

const getConnectionStatus = () => ({
  isConnected,
  registrationStatus,
  socketId: socket.id,
});

export {
  sendMessage,
  receivedMessage,
  updateLocation,
  waitForRegistration,
  getConnectionStatus,
  socket,
};
