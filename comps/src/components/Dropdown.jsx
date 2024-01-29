import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";

function Dropdown({ options, value, onChange }) {
  // options is array of different option objects
  //selection param is either an object or null

  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef(); // reference to some div element, doesnt give us back a direct reference to div, instead it gives us an object with a current property. (so we use divEl.current  thats an actual reference to div element)
  // we will take this variable and associate it with the root element of our component (below) 



  useEffect(() => {
    const handler = (event) => { // event handler

        if(!divEl.current){ // in the case that divEl,currnet reference is null(in cases where div we are referencing is not showing) just to be safe and check
            // if we did not assign the reference to any element , return early
            return; 
        }
        // if actual reference to root div element contains  whatever element the user just clicked on(event.target)
        if(!divEl.current.contains(event.target)){  // divEl.current is actual reference to div element // if true, user clicked outside of dropdown, set isopen to false 
            setIsOpen(false)
        } 
        else { // user clicked inside dropdown, 

        }
       
    }
    document.addEventListener('click', handler, true) // watch for clicks in capture phase anywhere on document
    // we need to make sure that when component is not on screen anymore, then the event listner to stop watching for clicks(was in optioinal video on useEffect) cleanUp is different in cases where second argument isnt empty 
    return () => { // clean up function, called (automatically) when dropdown component will be removed from screen 
        // remove event listener
        document.removeEventListener('click', handler); // turn off event hndler 
    }
  }, []) // called one time when component is rendered 

  const handleClick = () => {
    // so here, we are updating piece of state and deciding what its new value should be based on its current value.. FUNCTIONAL UPDATE OF STATE. new value of state is dependent on old value like so:
    // setIsOpen((currentIsOpen) => !currentIsOpen), but for vast cases the following will work. just keep this in mind
    setIsOpen(!isOpen); // TECHNICALLY NOT 100% BUT WORKS IN VAST SCENARIOS
  };

  const handleOptionClick = (optionClicked) => {
    setIsOpen(false); // close dropdown
    /* but we also want to what option user clicked on to update later on, so we have to know what the option was( like in accordion)
         we are building up an event handler and assigning it to a div that is being created inside a mapping function
         we want to communicate some info from inside the mapping function to this event handler 
        so rather than directly passing in our handler directly to onClick in mapping function{handleOptionClick}, we will instead put in a wrapped version of it ' { () => handleOptionClick}
        */
    // console.log(optionClicked)
    onChange(optionClicked); // in app (passed as prop)
  };

  /*
    we want to eventually list out on screen to user when user clicks dropdown
    we need to take list of options, map over them and return each option so user can eventually click on them
    in map since we are making a list of elements, the top divv/elementwill need key that is consistent and doesnt change 
    */
  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
/*  when this arrow function gets called by div (user clicks) , we will INVOKE handleOptionClick and pass in the option user clicked
        so in the mapping function we end up creating multiple copies of the exact same arrow function, different copies are created for every object inside the options array
        so when we eventually click on a div we will find one of the different arrow functions that gets created, we will call it, and that will invoke handleOptionClick with appropriate option
*/
  });
/* colors?.length checks if colors is defined or not and if it is just says undefined
  // let content = 'Select...';
  // if(selection) {
  //     content = selection.label; // if selection not null, we enter the new text as content, otherwise it will just be default 'Select...' if it is null
   } this can also be written as :  {selection?.label || 'Select...'}
*/
  return (
    // below, the ref prop, we are passing in variable that came from calling useref, react is going to take that reference (divEl) and it will give us a pointer or essentially allow us to 
    // refer to the actual HTML element that is created in broswer by that jsx tag
    <div ref={divEl} className="w-48 relative">
      {/* if value is null, show 'Select' else shpw the text we have clicked which is the selection parameter passed in that holds this object. logic above*/}
      <Panel
        className="flex justify-between items-center cursor-pointer "
        onClick={handleClick}
      >
        {" "}
        {value?.label || "Select..."} <GoChevronDown className="text-lg"/>{" "}
      </Panel>
      {isOpen && (
        <Panel className="absolute top-full ">
          {renderedOptions}
        </Panel>
      )}
    </div>
  );
}

export default Dropdown;

/* we need to hid {renderedOptions} div by default and when user clicks on div above it, we will toggle the visibilty of that div.. this is where isOpen state comes into plays
 so based on value of onOpen, well need to show or hide div of renderedOptions... we use use a JS boolean expression(notes in accordion about how it works)
     isOpen true, we get back the div (so it well show)
     isOpen false, we wont get that div(hidden)
 next thing to take care of is when user selects option, the dropdown closes. 
     we have a similiar problem (accordion)
     */

/* Goal/challenge* 
    - remember if you want to render an props object passed in, we need to make a map funcion to iterate through each item in options array. 
      For each item, a div is rendered with the content of option.label.
      The key attribute is added to each div to help React efficiently update and re-render the components when the array changes.
    - we need to figure out how were going to make the list appear and disapear overtime. (conditional rendereing) as user clicks on the drop down
    - content on screen is changing, so we are dealing with the state system

Notes on state design/ events +state design process : (like we did in accordion)
    1.) list out what a user will do and changes thell see while using app
            user clicks on box 
            dropdown list/menu opens
            user clicks item
            box closes
            selected option displayed inside box
    2.) Caatergorize each state as state or event handler 
            user clicks on box -> eh
            dropdown list/menu opens -> state
            user clicks item -> eh
            box closes -> state
            selected option displayed inside box -> state
    3.) Group common Steps/generalize steps 
            user clicks on dropdown -> eh (clicks on box, not similar to another ) 
            ---
            user clicks item -> eh (clicks on option/item, not similar to another)
            ---
            menu opens and closes -> state
            ---
            selected option displayed inside box -> state

    4.)  look at mockup. remove/simplify parts that arent changing
            all we have leftover after this is a dropdown opening and closing
    5.) replace remaining elements with text descriptions 
            - a menu is closed, no option selected
            - menu open, no option slected
            - menu closed, little spicy slected
    6.) repeat #4 and #5
            skipped. this step. the dropdown is pretty simple so there is no other variations
    7.) Imagine you have to write a function that returns the text of steps #5 and #6. in addition to your component props, what other arguments would you need? might need to be done onece for each state
            - goal here is to decide upon name and type of state
                state1(meunu open or not)
                    - state isOpen, of type bool
                        const myFunction = (options,isOpen) => {
                            if(isOpen) return 'menu  open' 
                            else return 'menu closed'
                        }

                        myFunction(opts,false) // menu closed
                        myFunction(opts,true) // menu open

                state2(an item selected, if so which one? )
                    - state is selected, of type option(item from object) or null
                         const myFunction = (options,selected) => {
                                if(!selected) {
                                    return 'no item selected'
                                }
                                else {
                                    return selected.label
                                }
                          
                        }
                        myFunction(opts,null) // 'no item selected
                        myFunction(opts,opts[1]) // a little spicy' 
                    Conclusion:
                        item selected -> state -> selected(name) -> option or null (type)
                        item selected -> state -> isOpen(name) -> boolean (type)
                        click an option -> eventhandler -> handleSelect
                        click dropdown -> eventhandler -> handleToggleOpen
                Lastly, where do we define/locate these states and event handler
                        Notes: do other component need to know state? consider another variation of component! refer to lecture 197 min 18
                                    yes? define in parent 
                                    no? define in child
                                put event handler with the state they control
                            Conclusion:
                                selected will be defined in parent, another component in future might need to know about selected piece of state selected, aka what was selected. we pass it down as a prop
                                isOpen wil be defined in child. no other component will need to know whether dropdown is open or not. 


*/

/* Notes on handling text input from older project (controlled component)... we will treat drop down in the same exact way

    1.) create new piece of state
    2.) create eh to watch for onChange function
    3.) when onChange event fires, get value from input
    4.) take that value from input and use to update your state
    5.) pass state to the input as value prop
                        why? 
                            manage the text in the input using state system
                            need to know what search term is? 
                                reference term variabel
                            need to change search term? 
                                call 'setTerm' ('fjwenfkjs')
                            inputs managed in this style are called controlled inpouts

            
*/
/* 
so basically what we will do is 
        define handleSelect in parent component 
        define selection piece of state in parent
            pass down as prop to dropdown
        inside of dropdown compoennt, when we recieve selection state (prop) we will use it to decide what text will diplsay in dropdown(label)
        when user changes dropdown(open it and click option)
            call onSelect inside dropdown
            user clicks new option, we communicate this new selection it back up to parent by calling the handleSelect event handler, hence updating data inside the parent

        --
        Every component we make that shows a form control will follow this pattern. this is the naming convention commonly used. has nothing to do with what its named in parent component but more with how the names 
        are when passed into the child. used when components deal with user input/choice in some way
        we should use the same prop names for all form control components. its easy to remember
                        extremely common patterns: 
                            call the 'current value' prop 'value'
                            call the 'value changed' prop 'onChange' 
*/
/* style refactor: 
we have several class names with duplicated text due to tailwind css
we will try and refactor this with a reusable component called Panel
    notes on reusable presentation components (we used in button components)
    1.) create new component that shows a handful of jsx elements 
    2.) make sure the component accepts + uses the 'children' prop
    3.) allow extra classNames to be passed in  + merge them .. can use classnames library
    4.) take extra props, pass them through to root element 
*/
/* Next refactor:
    if user opens up multiple dropdown or clicks on dropdown then clicks anywhere else on the screen, the drop down should close automatically
    we want to watch for click events outside dropdown. 
    so if user clicks outside dropdown area, set isOpen to false 
    the challenge here is how do we watch for click events in elements NOT created by our drop down.
Plain JS we can do (lecture 211)
    - document wide click handlers (useful when we want to check what user has clicked )
        const handleClick = (event) => { // when handleCLick is invoked, it revieves event object
            console.log(event.target); // tells us what element was clicked on by user 
        };
        document.addEventListener('click', handleClick)

    - event capturing/bubbling
        when an event occurs, browser wants to find event handlers to call
        order in which this search occurs is 
            capture phase-> goes to what was cliked on, go to most parent of clicked element, see if it has handler, go to second most parent...repeats until it gets to button element. most of the time is disabled
            target phase -> go to the clicked element, check to see if it has event handler. does it have an event handler? if so its called
            bubble phase -> go to parent of clicked element, see if it has handler, if so call it, then go to parents parent.. etc 
    - checking element inclusion
        
React we can do(hooks)
    useFffect: 
        allows us to run little snippets of code at very specific points in time. whenever we call it, we pass in a function to it. this is the function that will be called
        we are always guranteed that our function will be called the first time our component renders
        in our case for the dropdown, we want to make sure that when our dropdown  is first rendered to the screen we start watching for click events anywhere in the dom, and will want to keeo wathing 
            anytime our component is visible on screen
    useRef
        allows a component to get a reference to a DOM element it creates
        95% of time used with DOM elements, but can hold a reference to any value
            1.) create a ref at the top of your component by calling 'useRef'
            2.) assign the ref to a JSX element as a prop called 'ref' 
            3.) access the dom element with 'ref.current'

*/ 