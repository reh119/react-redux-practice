// both link and route component have code to import useContext and NavigationCOntext and make use of them together. 
// to save some time ,we can make this custom hook here for in the future. making it easier for other engineers to use navigation system 
/// good practice on custom hooks

import NavigationContext from "../context/navigation";
import { useContext } from "react";


function useNavigation() {
    return useContext(NavigationContext);
}

export default useNavigation;