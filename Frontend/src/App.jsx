import Routes from "./routes/Routes";
import { ToastContainer, Bounce } from "react-toastify";
import { useEffect } from "react";
import { socketConnection } from "./utilities/socket";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  useEffect(() => {
    socketConnection();
  }, []);
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Routes />
    </AuthProvider>
  );
};

export default App;
