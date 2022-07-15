import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import App from "./App";
import store from "./app/store";
import GreetingBot from "./components/GreetingBot";
import { ApiProvider } from "utils/api";

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <GreetingBot />
    <React.StrictMode>
      <ApiProvider>
        <App />
      </ApiProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
