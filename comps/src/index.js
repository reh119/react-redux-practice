import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(<App />);


/*
Some issues that arise when working on large projects with other engineers is we start to get inconsistent styling like different buttons. How can we fix this?
    - we can use the 'Button' component
    - dont make <button/>
    - all buttons wil be styled based on the purpose/intent of the button
    - no custom CSS only presets 
*/