import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.css";

import { StreamflixProvider } from "./context/StreamflixContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <StreamflixProvider>

            <App/>

        </StreamflixProvider>

    </React.StrictMode>

);