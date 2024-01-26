import Button from "./Button";
import {GoBell, GoCloudDownload, GoDatabase} from 'react-icons/go'


// importing icons using react-icons, and we treat them as regulary components
function App() {


    
  return (
    <div>
      <div>
        <Button success rounded outline className = "mb-5"> 
        <GoBell />Click Me!</Button> 
      </div>
      <div>
        <Button danger outline> <GoCloudDownload/> Buy Now!</Button>
      </div>
      <div>
        <Button warning> <GoDatabase/>  See Deal!</Button>
      </div>
      <div>
        <Button secondary outline>Hey There  </Button>
      </div>
      <div>
        <Button primary rounded >Something! </Button>
      </div>
    </div>
  );
}

export default App;
/* 
In react, jsx has special rule for custom component, anything between the component tags will be taken as prop called children to our custom component where we can use it
- the next thing we have to do for our button components is design the props around them. so think about what props wed be passing to design these buttons? eg rounded = {false}, outline = {false}
- how are we gonna communicate the variation/purpose of the button? we can make a prop called purpose = 'primary'. this works, but we will try something else(for sake of learning).
    - we will pass props of primary, secondary, success, warning where they are booleans 
        eg: prop name -> type(boolean) -> purpose(change styling)
    Note: <Button primary={true}></Button> is the same as <Button primary> </Button> and
          <Button> </Button> if we want primary prop to be false instead of  <Button primary={false} > </Button>
          <Button> </Button> : this will pass down prop of undefined 
    - Note: one challenge will be how we handle a situation where accidentally provide multiple true for prop where only one should be true, we fixed this using typeProps in Button.jsx
--------------------
Tailwind css
    - CSS library with tons of classNames
    - each className provides one styling rule, meaning well have a ton of class names 
    - components will be harder to read
    - tons of classNames to look up to apply any styling
    - some normal css features dont work will with tailwind
    - why? the className mess is going to force you to write smalled and more reusable components!
    -----
    Using tailwind:
        1.) decide on a new styling rule you want to add
        2.) go to tailwindcss.com/docs
        3.) smash command+K as hard as possible
        4.) search for styling rule
        5.) add apprpriate className to your elements 

        CSS Box Model:
            Margin
            Border
            Content
            Padding

Notes on text-white: 
    - youll notice that text-white will override all other colors used in the buttons. a solution is to use the tailwind-merge utlilty library
**challenge** 
    sometimes well have to use plain old custom css to style icons and buttons since tailwind will sometimes now work with icons at times 

    - Last: **challenge** classNames
        - small bug: imagine we want to get a little bit of spacing/margin underneath the first button only. we use  <Button className = 'mb-5' /Button? should work, but it doesnt. className is not working correctly
        - this is because we are passing a prop down into <button> element in Button.jsx component called classNames = {classes} , they are identical.  one from the parent compoennt, and one in Button component. so it is being overwritten later
        - solution is making use of our className function we made listing all the stlyes. we will look at rest object and pass in
            eg: const classes = twMerge(className(rest.className,'flex items-center px-3, py-1.5 border',{
                ......
                this means well recieve whatever className property is coming in off rest object, and use it as part of our overall classes declaration. we merge in in one big string and pass it down into into className prop in Button.jsx (className={classes})
                this uses the classnames library
In conclusion: we have working reusbale button(Button). enhanced with additional props where engineers have similar look and feel for all buttons used in our app. 
                - this pattern of taking a plain html element (button) and wrapping it with a react component with additional set of props is very common. 
                    - we made a custom component engineers working on our app can use instead of plain button
                    - our special button will recieve some extra props that are not going to be used by the underlying button element(primary secondar success) but will be used by our Button componentto enhance ut by adding better styling, functionalitymore events etc

*/