import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import 'regenerator-runtime/runtime';


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>

            <App />

        </BrowserRouter>
    </React.StrictMode>
    ,
    document.getElementById("root")
);