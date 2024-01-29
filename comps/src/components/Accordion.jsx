import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

function Accordion({ items }) {
  // state will be used to decide how each indiviual item will be rendered, goal of mapping function is to executed multiple times each time with a different item.
  const [expandedIndex, setExpandedIndex] = useState(-1); // by default, no item(index -1) will be expanded when first displayed

  const handleClick = (nextIndex) => {
    if (expandedIndex === nextIndex) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(nextIndex);
    }
    // close currenlty open tab
  }; // REFER TO LECTURE 184-185 if confused
  /* notes on map function:

  The map function is used in this code to transform each item in the items array into a corresponding JSX element.
  inside the map function, JSX elements are created for each item. The structure of each JSX element includes two div elements that display the label and content properties of the corresponding item.
  the map function creates a new array (renderedItems) where each element corresponds to an item in the original items array but transformed into JSX.
  he renderedItems array is then intended to be used in the JSX returned by the Accordian component. 
  reminder* top level element must be given a unique key prop.

  im summary, the map function will be called multiple times, and everytime we call it, we will create a new arrow function. this arrow function when executed will call handleClick, passing in current value of index each time

  */
  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;
    const content = isExpanded && (
      <div className="border-b p-5">{item.content}</div>
    ); // if isExpanded is true, we get back whats in the div(last true value) // if isExpanded is false, we get back isExpandedValue
    // if isExpanded false we want to remove rendering of div (conditional rendering)
    const icon = (
      <span className="text-xl">
        {" "}
        {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
      </span>
    ); // isExpanded true we get DOWN, isExpanded is false we get LEFT(ternary operator), like an if statment. ? what would happen if we dont use span?
    return (
      <div key={item.id}>
        <div
          className="flex p-3 bg-gray-50 border-b items-center cursor-pointer justify-between"
          onClick={() => handleClick(index)}
        >
          {item.label}
          {icon}
        </div>
        {content}
      </div>
    );
  });

  return <div className="border-x border-t rounded">{renderedItems}</div>;
}
export default Accordion;

/*
    add in event handler and watch for clickEvent on label div. when user clicks on this div, its a sign they want to expand that item.
    first time for us setting up click event handler on element created inside mapping function(a little tricky)

    cases:
        1: user clicks 1st label, we want to run setExpandedIndex(0)
        2: user clicks 2nd label, we want to run setExpandedIndex(1)
        3: user clicks 3rd label, we want to run setExpandedIndex(2)
Reminder event handlers: 
    longhand version good for if handler has >1 line of code. slighlt harder to use with lists 
    shorthand version good for handler 1 line of code using arrow function. can make jsx harder to read



*/

/* Notes/Review on react- will use to do conditional rendering - doing some sort of check and decide whether or not to display jsx elements or
    React doesnt print booleans, nulls, undefined 
    JS boolean expressions:
        || gives back the first value that is truthy -> 100 || 200 ->  returns 100
        && gives back the first falsey value or the last truthy value -> returns 200
            egs: || returns first value that is truthy
                'hi' || 'there' -> 'hi' 
                false || 'there' ->  'there'
                0 || true -> true
                50 || null -> 50
                100 || 200 -> 100
            egs: && returns the first falsey value or last true value
                'hi' || 'there' -> 'there'
                false || 'there' ->  false
                0 || true -> 0
                50 || null -> null
                100 || 200 -> 200
*/

/* Notes: goals.. overgoal on this componenet is focus on state system, and design process of understanding how to add state to compoenent and design it efficetively
   1.) to display contents of items passed in from App (items)
   2.) now that they are displayed, how do we hide them? toggle them etc? STATE system!! 
State notes on design process
    - When to use? -> when we need to change content on state 
    - what should it be called?? -> ?
    - What type of data will my data be? -> ?
    - which component should it be defined in? -> ?
Design Process
    - Design process takes some time 
    - will learn expanded version first
    - well use it for design state for accordion comp
    - process works very well with designing more complex componets 
-----------------------
Events + State Design Process:
     ---- What state + handlers are there? ----
    1.) List our what a user will do and changes they will see while using your app , interaction and consequence
        how would user describe using our app step by step? use mockup
        Steps: 
            1.) user clicks on third section
                1st section collapse 
                3rd section expands 
            2.) user clicks 2nd section
                3rd section collapse 
                2nd section expands
    2.) catergorize each step above as 'state' or 'event handler' 
        user sees something on the screen change -> likely need state to implement 
        user commited action -> likely need event handler to implement 
                user clicks on 3rd section -> event handler
                1st section collapse -> state
                3rd section expands -> state
                user clicks 2nd section -> event handler
                3rd section collapse -> state
                2nd section expands -> state
    3.) group common steps. remove duplicates. rewrite descriptions (more generalized)
        Preliminary Design
               clicked on section header -> event handler 
               one section is expanded, all others are collapsed -> state
    ----What name and type? ---- *ideally we prefer to avoid state that are arrays and object*
    4.) Look at mockup. remove or simplify parts that arent changing 
        in accordion mockup, we can remove text from section titles. this doesnt change. 
        text inside content area is also not changing. 
        in conclusion, panel is just growing and shrinking, text doesnt matter
    5.) replace remaining elements with text description. simply explain 
        expanded section
        collapsed section
        collapsed section
    6.) repeat #4 and #5 with a different variation
        for example for the first variation, we had 1st section open, now we repeat prevous 2 steps as if the 3rd section was expanded instead 
            4.) done
            5.) collapsed section
                collapsed section
                expanded section
    7.) Imagine you have to write a function that returns the text of #5 and #6. in addition to your component props, what other arguments would you need? 
        write function returning strings:
        expanded section
        collapsed section
        collapsed section

        collapsed section
        collapsed section
        expanded section
    props we recieve is called items (array of objects)
        challenge here is to imagine we are defining a function called myFunction(items, ????), recieving our items array, what TYPE of additional argument would our function need to recieve to 
        return 
            case1: 
        expanded section
        collapsed section
        collapsed section

            case2: 
        collapsed section
        collapsed section
        expanded section
We know what we want to return from function and we need to figure out what params we need 
solution1: pass in simple number of 0 in case1, and 2 in case2
    expanded is at indez 0 in case1
    expanded is at index 2 in case2
        were really just changing where expanded is located 

    myFunction(propItems,0); // ['Expanded', 'collapsed', 'collapsed']
    myFunction(propItems,2); // ['collapsed', 'collapsed', 'expanded']
so final function can look like: (map function is tricky**)
     myFunction(propItems,expandedItem) {
        return items.map((item,index) => {
            if(index == expandedItem){
                return 'Expanded'
            }
            else {
                return 'collapsed' 
            }
        })
     }
     Preliminary Design
               clicked on section header -> event handler 
               one section is expanded, all others are collapsed -> state -> expandedIndex -> number
****
----where its defined? ----
    8.) Decide where each event handler + state will be defined 
     expandedState in app or accordion? in parent or child? 
        the better question when trying to define where state should be defined 
            "Does any component besides Accordion reasonably need to know which item is expanded? aka the expandedIndex piece of state is? "
                no? -> define in accordion
                yes? -> define in app
            example as to why in lecture 181 at min 25
            ** remember react is not good at direct communication between siblings 
for our case, no other component other than Accordion will need to know about the expandedIndex piece of state so we can define in accordion. in the case that maybe we had a seprate navbar component that wanted 
to output the expandedIndex, it would be better to define it in app so its easilt passed as a prop from parent to child
     About event handler: handleClick
        Every handler should be usually defined in same component as state it modifies 
        it might be used in a different component. so if defined in APp, we can still use it in Accordion
            so in our case we can define event handler in Accordion
            ** THIS IS THE LONG VERSION OF THE DESIGN PROCESS**
*/
