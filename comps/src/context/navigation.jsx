import { createContext, useState, useEffect } from "react";

const NavigationContext = createContext();

function NavigationProvider({ children }) {
  // when app first starts up, we immediatley look at address bar and decide what content to show. so default state is
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  // the following useEffect  function is all for handling when user clicks forward or back, not in hard refresh,
  useEffect(() => {
    const handler = () => {
      // when user naviagtes using front and back, the handler is going to be called.
      // here, we will look at what address the user naviagted to, and will use this to update current path piece of state
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handler);
    // when navigation provider component is about to be removed from the screen, we want to clean up this event listener. (unlikely but good to add clean up when event listener is on window object)
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []); // only want arrow function called one time so we use emty array as second argument

  const navigate = (to) => {
    // to == '/accordion'
    window.history.pushState({}, "", to); // calling pushstate so that we update path in address bar
    setCurrentPath(to); // update path
  };

  return (
    <NavigationContext.Provider value={{ navigate, currentPath }}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
export { NavigationProvider };
/* Next challenge:
    Whenever we navigate the user around using the pushState function, if a user clicks forward or back button, that triggers a popState event that we need to listen to
    we need to essentially update our currentPath piece of state.only reason we update piece of state  is to cause our component to re render.
Next challenge: Programmatic Navigation
    anytime we trigger navigation from code, we use programmatic navigation
    we will use a navigate function to do two things 
        call pushState to uodate path in address bar 
        update currentPath piece of state (update address bar AND current path so our componenet re renders)
        we will share it to other componenets using context
Next: Link Component 
    goal of this component is to override normal navigation
    Link will be anytime user wants to naviagte to a path inside our application. 
    if user is navigating to another domain, we will use a normal <a> anchor element 
    else user naviagting to a path in our app, use this component
Next: Route Component
    goal is to show different contents on screen depending on path user is visiting. 
    we need to take into account the current path and use it to decide whether we should show dropdown, accordion, button? 
    we will follow commmon pattern
Next: handling control and command keys
    when we click on link while holding command tab, link should open up in seperate window
Next: custom hooks 
Next: Sidebar component: 
    will show list of links in our side bar to accordion, button, etc 
    dropdown page will be shown as defualt at localhost:3000
Next: Side bar links
    each link had some spacing beneath it
    each link will be highlighted in bold for link we are in

*/
