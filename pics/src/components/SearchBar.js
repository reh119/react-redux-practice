
function SearchBar({onSubmit}){ // destruct prop 
    // in order to get 'term' from custom searchBar (child)component  back to parent App compoennt, we will treat it like an event handler. 
    // detect user pressed enter key.. now we need to communicate some data from child up to parent 
    // call onSubmit with the current term and pass in term back to parent component where it will show up in handleSubmit function, inside handleSubmit callback we will call searchImages(terrm)
    // from here our after we get images in parent component(after api is called previously), we simply use prop system to take list of images and get it fown to ImageList

    // recieve prop from App.js aka parent component 
    const handleClick = () => { // callback function/event handler for button below
        onSubmit('cars') //param is form user input

    }
    return(
        <div>
            <input /> 
            <button onClick = {handleClick}> Click Me</button>
        </div>
    );
    // when using button (jsx element), we HAVE to use onCLick prop!! this is not true when using a custom component event *eg in SearchBar. 
       
       
       
    
}
export default SearchBar;