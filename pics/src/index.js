import React from "react";
import ReactDOM from 'react-dom/client'
import App from './App'

const el = document.getElementById('root')
const root = ReactDOM.createRoot(el)



root.render(<App/>)




/*  Notes: 
Some facts about this app
    - search bar components contains the text input a user will type into -> term
    - the user pressing'enter' key in the text input means we need to do a search
    - we have a function that will turn a search term into an array of image objects -> searchImages
    - the array of image objects needs to get into the ImageList component -> images

    ** sibling components cannot directly communicate! ** 
    to share info between sibling component we need to involve the parent component
    use props to communicate from parent to child
    app can send the list of images to imageList using props

    ** challenge is how can we get information from child to parent? ** 
    in this case we want to get 'term' or what was typed into the searchBar back up to the searchImages function. 
Child to parent communication: 
    - Treat it like a normal event
    - pass an event handler down
    - call handler when something interesting happens 

*/