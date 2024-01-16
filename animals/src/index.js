import React from "react";
import ReactDOM from 'react-dom/client'
import App from './App'
//import ReactDOM from 'react-dom';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el); 

root.render(<App/>);

/* Notes:

Here we want to focus on the event system and the state system 

Event System <----- Detecting a user clicking the button

State system <----- Update content on screen being rendered. 

*/