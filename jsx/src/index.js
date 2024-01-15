// 1.) import react and react dom libraries

import React from "react"; // library that defines what a component is and how multiple components work together
import ReactDom from "react-dom/client"; // library that knows how to get component to show up in browser
import App from './App'
// 2.) get reference to div with ID root
const el = document.getElementById("root");
// 3.) tell react to take control of that element
const root = ReactDom.createRoot(el);
// 4.) create component


// 5.) show component on scrreen
root.render(<App />);


/* NOTES: 

 PROPS are used to customize element, for numbers and variables you need {} and for strinfs you need quotes, objects need to be in {{}}
 we cannot print/display out an object inside element, but we can provide it as a prop using double brackets 

 names/values of attributes that you provide to elements in html are slighlty different in jsx:
 HTML --> JSX :
 1.) All props names follow camelCase
 2.) number attributes use curly braces 
 3.) boolean 'true' can be written with just the property name. 'false' shuld be written with curly braces 
 4.) the 'class' attribute is written as 'className'
 5.) in-line styles are provided as objects 
*/