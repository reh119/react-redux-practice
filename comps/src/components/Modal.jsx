import ReactDOM from "react-dom";
import { useEffect } from "react";

function Modal({ onClose, actionBar, children }) {
    useEffect(() => { // to fix small bug when large amount of content is on screen
            document.body.classList.add('overflow-hidden') // some js to add this tailwind to the html documnet bodystyle 

            return () => { // clean up function when modal is about to be removed 
                document.body.classList.remove('overflow-hidden')

            }
    }, [] ) // only run one time when modal is displayed


  return ReactDOM.createPortal(
    // -> tell react to place html produced by this component somewhere else
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className="fixed inset-40 p-10 bg-white">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex justify-end"> 
          {actionBar}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container") // -> reference to an element in our index.html file
  );
}

export default Modal;

/* Modal Notes:
    We will have a button 'Show Modal'
    Should the button be displayed by the Modal component or by component displaying the modal? 
    What component inside of our application is going to show the 'Show Modal' button
    What component is going to declare/own the state that will determine whether or not the Modal is visible

    Option 1: 
        Modal shows a button and owns the state. -> this probably wont be a good idea bc we might want to show a modal without a user clicking a button 
    Option 2: 
        Parent owns the showModal state + shows button to keep track of whether modal should be displayed -> better idea bc parent component can show a modal anytime for any reason
??: what would the parent of Modal be? -> ModalPage


    Correctly displaying Modal is hard
        1.) the background of the modal needs to cover the entire screen
        2.) the modal needs to cover up all existing content
    Some of these difficulties arrise due to css so having a good understadning of what styling is being applied will help
        tailwind classname--------> css rules
            absolute-> position: absolute
                puts element 
                    at the top left corner 
                    of the closest parent
                    with a position other than static
                if there is no other parent with a position other than static
                    puts element 
                        top left corner of html doc 

            inset-0 -> top:0 , left:0, right:0 bottum:0;
                if the element is position: absolute
                the element will expand to fill the height and width
                of the closest parent with non static position
            with no parent
                element placed in top left of html doc, and fill it
        This applies to our app
            right now, our gray background only working correctly because there is no 'positioned' parent
            if our modal had a positioned parent, it would not fill up the entire screen. this means if APp or Modal page has a positioned element now or in future modal will not display correctly
            real projects use positioned parents, sometimes it cant be avoided 
    Solution? PORTALS(lecture 240)
        A portal changes the way React works. It will tell react to not place Modals HTML there (nested) but place it elsewhere instead in html document 
        this fixes the issue because the div will never have a positioned parent
        Modal will be positioned relative to the HTML doc
        it will always fill the entire screen!
        now that we have implemented this, if we were to put a position other than static in parent component of Modal, it wont break 
Next: Closing the modal

Next: allowing parent component of ModalPage to better customizr the contents displayed inside the modal
    ModalPage will pass down a children prop, and then to customize the content at the bottum ,we will pass down a prop called action bar
        both these props will be something 'renderable' 

Next: make screen unable to scroll when a large amount of content is on it when Modal pops up 
    another small bug is when open modal button was at the bottum, the modal would open but wed have to scroll to top to see it. we fixed this by changing absolute position to 'fixed'

*/
