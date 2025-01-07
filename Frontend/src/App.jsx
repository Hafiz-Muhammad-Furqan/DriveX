import Routes from "./Routes/Routes";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { ToastContainer, Bounce } from "react-toastify";

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
