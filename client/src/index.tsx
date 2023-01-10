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
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage404 from "pages/ErrorPage/ErrorPage404";

ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorPage404}>
    <Provider store={store}>
      <ToastContainer />
      <GreetingBot />
      <React.StrictMode>
        <ApiProvider>
          <App />
        </ApiProvider>
      </React.StrictMode>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
