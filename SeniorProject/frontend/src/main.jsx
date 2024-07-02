import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "../context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store"; // Import your Redux store

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {" "}
        {/* Wrap your App with Provider */}
        <AuthContextProvider>
          <ToastContainer
            theme="light"
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnHover={false}
          />
          <App />
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
