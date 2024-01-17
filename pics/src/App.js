import SearchBar from "./components/SearchBar";
import searchImages from "./api";
import ImageList from "./components/ImageList";
import { useState } from "react";

function App() {
  // make callback function like handleSubmit to searchBar (pressing enter key)
  // pass callback down to searchBar as prop key = onSubmit

  const [images, setImages] = useState([]);

  
  
  const handleSubmit = async (term) => {
    // term coming from child component (SearchBar), this is like our event handler
    //  console.log('DO a search with, ', term)
    const result = await searchImages(term); // need to use await async becuase we have to wait for for searchImages to make api call.. wait for request to finish
   // console.log(result); // should return array of image objects. this is our list we eventually want to show
   setImages(result); // update state with results we got bacl
  };
  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageList images={images}  />
      
    </div>
  );
}
// we are passing handleSubmit into searchBar as a prop called onSubmit, onSUbmit can be called anyhting as we are using a custom component not  jsx element. it has to match the param we pass in into the child component!!!
//goals :
//We need to communicate the array of images down to ImageList by combining the state + prop system
export default App;
/* Steps: 

    - images starts empty array 
    - define callback function
    - return some jsx,  creasts custom component: <ImageList images={images}  />, passing down images piece of state
    - user submits form, presses enter key
    - run handleSubmit
    - search to the api, which takes some time, we wait, take results and use results to update images pieces of state 
    - when piece of state is updated, react will re render app component
    - now images wil have array of objects
    - when we return jsx again, ** we will rerender app component as well as its children as well. so image list wull recieve brand new array of images (not empty anymore ) so ImageList component will be re rendered with a non empty array
    in conclusion:
        when you update a state, the component AND ALL of its children are re rendered 
        from the perspective of 'app' images is state 
        from the perspective of 'ImageList', images is props


*/