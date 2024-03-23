import React from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./app";
import ProfileImageContext from "./component/Context/ProfileImageContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <ProfileImageContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProfileImageContext>
);
