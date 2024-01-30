import useNavigation from "../hooks/use-navigation";

function Route ({path,children}) {
    // reach in context and look at currentPath piece of state
    const {currentPath} = useNavigation(); 

    if(path === currentPath){
        return children; // what we want to show(component)
    }
    else{
        return null; 
    }

}

export default Route