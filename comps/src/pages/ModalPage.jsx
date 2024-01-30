import Modal from "../components/Modal"; // up one dir, into components
import { useState } from "react";
import Button from "../components/Button"; // will use custom button component we made

function ModalPage() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const actionBar = (
    <div>
      {" "}
      <Button onClick = {handleClose} primary> I Accept </Button>
    </div>
  );
  const modal = 
    (
      <Modal onClose={handleClose} actionBar={actionBar}>
        <p>here is important agreement for you to accept</p> {/*this is the children prop!!! */ }
      </Modal>
    );

  return (
    <div>
      <Button onClick={handleClick} primary>
        {" "}
        Open Modal{" "}
      </Button>
      {showModal && modal}{" "}
      {/* if showModal is true, display that component, if false, we display nothing*/}
    </div>
  );
}
export default ModalPage;

/* Modal Notes:
    when modal does appear, and user clicks on button called "Accept" or clicks outside of the modal pop up, the modal should go away(hide)
    this implies that we should create a event handler function inside of ModalPage component(onClose), and pass it down to Modal.
    when user clicks Accept button inside of Modal or background, this will be a click event handled by the modal component on gray background element
    the modal component is going to have to call this event handler (onClose) thats being passed through props, and inside of this event handler we will have to update 
    the show modal piece of state to be false 
    --
    Correctly displaying Modal is hard
        1.) the background of the modal needs to cover the entire screen
        2.) the modal needs to cover up all existing content
    
        

*/
