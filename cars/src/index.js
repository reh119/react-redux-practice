import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux"; // connect redux side to react side of our project (once per project)
import { store } from "./store";

const el = document.getElementById("root");
const root = createRoot(el);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
