import ImageShow from "./ImageShow";
import './ImageList.css'

function ImageList({images}){ // prop destructuring 
    //images is prop coming from app 
    // now our next challenge is building a list by mappiing list of images. show one image on screen for each object inside
    const renderedImages = images.map((currentImage) => { // passing in one single image inside our images array one by one, renderedImages will be new array
        return <ImageShow key = {currentImage.id} image={currentImage}/> // pass that single image down as prop
        // the above return statement works but remember: each child in a list should have unique 'key' prop
        // add key prop to TOP most element of that list
    });

    return(
        <div className="image-list">{renderedImages}</div>
    );
}
export default ImageList;
/* Notes on keys:
    Use whenever we have list of elements, so everytime we do map
    add the key to the top most jsx element in the list, very common to forget this. for example if we were to wrap <ImageShow... /> with a div, wed have to move the key prop to this div instead of where its at right now
    must be string or number
    should be unique for this list, cant have same ids in SAME array
    should be consistent across renderers 

    if id isnt given to you by api, we can use index of record as we iterate through array of elements 

*/