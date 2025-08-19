import React from "react";
import ReactDOM from "react-dom/client";
import App1 from "./App";
import App2 from "./App2.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Hier wählst du, welche App gestartet wird
//root.render(<App1 />);
root.render(<App2 />);
