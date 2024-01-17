import SearchBar from "./components/SearchBar";
function App(){
    // make callback function like handleSubmit to searchBar (pressing enter key)
    // pass callback down to searchBar as prop key = onSubmit
    // 

    const handleSubmit = (term) => { // term coming from child component (SearchBar), this is like our event handler
        console.log('DO a search with, ', term)
    }
    return(
        <div>
            <SearchBar onSubmit = {handleSubmit}/>
        </div>
    )
}
// we are passing handleSubmit into searchBar as a prop called onSubmit, onSUbmit can be called anyhting as we are using a custom component not  jsx element. it has to match the param we pass in into the child component!!!

export default App;