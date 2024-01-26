// import PropTypes from 'prop-types' -> dont need because we are not using default checks 
import className from 'classnames' // double check documentation
import { twMerge } from 'tailwind-merge'




function Button({children, 
    primary, // these are all our props passed in from app
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    //onClick // added onClick event handler to this button component we just made 

    // remaining props passed down from parent component 
    ...rest // take remaining props out of props object besides the ones listed above, collect them and assign them to variable called rest(like onClick, onMouseOver etc and assume theyre intended for button element)
}) { // wrapper

// fisrt argument will be applied to button always no matter what
    const classes = twMerge(className(rest.className,'flex items-center px-3, py-1.5 border',{
        // keys are classnames and values are references to different props for button
        'border-blue-500 bg-blue-500 text-white': primary ,// primary === true -> if primary is passed in true this is passed insto class name
        'border-gray-900 bg-gray-900 text-white': secondary ,
        'border-green-500 bg-green-500 text-white': success ,
        'border-yellow-400 bg-yellow-400 text-white': warning ,
        'border-red-500 bg-red-500 text-white': danger , 
        'rounded-full': rounded ,
        'bg-white': outline, // later classname will override and take priority
        'text-blue-500': outline && primary, // if outline && primary are sent in true
        'text-gray-900': outline && secondary,
        'text-green-500': outline && success,
        'text-yellow-400': outline && warning,
        'text-red-500': outline && danger,

    }))

// {...rest} means take all individual properties and values out of this rest object, and assign all of them as props to button element! 
// -> this works because we made sure the remaining props passed in were placed into rest and theyll only be event handlers. cant do it one-by-one. this is tricly syntax 
    return <button {...rest} className={classes}>{children}</button> // underlying element thats wrapped
    // we recieve the onClick prop from app.jsx, and take that prop and pass it to our button element as an onClick prop to button element
}

Button.propTypes = {
    checkVariationValue: ({primary,secondary,success,warning,danger}) => { // check variations of buttons
        // we want to check that the user provided a value of true for more only 1 primary, secondary, sucess etc
        const count = Number(!!primary)
        + Number(!!success)
        + Number(!!warning)
        + Number(!!danger)
        + Number(!!secondary);  //goal here is to add up all the values of props (either 1 or 0), and the sum should never be more than 1. this ensures only one prop will be true and.
        if(count > 1) {
            return new Error("Only one of primary,secondary, success, warning, danger, props can be true")
        }
    }
}

export default Button;
/*
Recieving the children prop from whatever was typed between out custom component back in app
- Note: one **challenge** will be how we handle a situation where accidentally provide multiple true for prop where only one should be true. a button can only have one stlye
    - we can do if statements but this will be alot of code 
    - we can use 'prop-types': 
        - it is a JS library to validate the props that get passed into your component 
        - if someone passes down the incorrect kind of value, (number instead of boolean) a warning will appear in console. 
        - used to be very popular, but now TYPESCRIPT does almost the same thing(and more)
        - in our case we want to make sure only one prop passed in was set to true becaue we cant have more than 1 being true (styling would mess up)

- Our next **challange**  is: how will we use a different style for each different type of button? we can use some logic using if else statements and this will work but bery tedious
    - we can  use classnames js library(optional)
        - JS library for building up a className string based on different values appropriate for use as className prop
        - library called classnames but remember that prop is className


            const primary = true;
            const warning =false; 
            clasNames{{
                'bg-blue-500' : primary, -> if true, so we expect to see string come out of classNames function including bg-blue-500, not bg-yellow
                'bg-yellow-500' : warning
            }}

            eg : 
            /*

            
 when finalClassName is ran, it will look at each individual key value pair. key will be included only if value is truthy
const finalClassName = className ('pz-1.5', {
     this will be the tool we use to build up classname string based on all out button prop options based on whether they are true or not
     first argument will always be returned
     objects in classnames libary
    'bg-blue-500': true // 
})
 console.log(finalClassName);

 Our next **challenge** will be: how do we display icons in our buttons on different buttons 
    - we will make use of react-icons library!!
    - there is alot of different sets of icons created by different people. they tend to be similar in look and feel
    - different sets of icons sometimes not meant to work in react projects. we can use all these sets of icons in react-icons
        - but how will we make sure the icons are displayed next to the text--> flex items-center
we are now at a point where weve got a great Button component that we want to share with engineers. 
    - instead of using <button/> we can use <Button/>! like we did in app.jsx
    - this brings up a new *challenge*.. engineers would most likely ask "how do I add a click event handler to this <Button/>?? "

        normally when using <button/>  element, we use onClick prop and pass in function handleClick, react will call the handleClick function automatically when button clicked
            out component is different, <Button/> will recieve props like primary, secondary, secondary and so on, so if someone gave sent us an onCLick prop, it will not be communciated to the plain <button/> element
            Possible solution: - if someone gives custom component and onCLick prop and pass it down through to plain og button element displayed.
                               - we need to add it to props passed into Button like other props were 
                               - well this presents us with another **challenege**
                               - engineers will ask, well how do I add a mouse over event handler to <Button/>. this tells us our solution might not be the best because how will we account for all Button event handlers??
                                    solutions: note how some props being passed are meant for out custom component and others are meant for button basic element
                                        1.) inside button component when we recieve props, well list out props 1by1 that out custom component wants to make use of inside of Button comp
                                        2.) use special syntax in JS that will allow us to collect remaining props inside props object, and assume theyre intended for plain button element
                                        3.) Done! engineer can now add on normal event handler on our custom Button component
    - Last: **challenge** 
        - small bug: imagine we want to get a little bit of spacing/margin underneath the first buttin
*/

