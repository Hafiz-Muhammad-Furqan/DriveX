import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import "remixicon/fonts/remixicon.css";
import * as ReactDOM from "react-dom/client";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "./utilities/stripe.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <StrictMode>
      <App />
    </StrictMode>
  </Elements>
);
