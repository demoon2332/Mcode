import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import "../../../styles/components/common/modal/index.css";

// standard modal
const Modal = ({ setOpen, title, children, onYes, onNo, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const modalRef = useRef(null);

  const clickOnClose = () => {
    setIsVisible(false);
    // onClose();
  };

  const clickNo = () => {
    setIsVisible(false);
    // onNo();
  };

  const clickYes = () => {
    setIsVisible(false);
    // onYes();
  };

  return (
    <div
      ref={modalRef}
      className={`modal-container  ${isVisible ? "" : "hidden"}`}
    >
      <div className="modal">
        <div className="modal-header">
          {title} Modal 1 Title
          <button className="close-btn" onClick={clickOnClose}></button>
        </div>

        <div className="modal-content">{children}This content is empty, please try again
        </div>

        <div className="modal-footer">
          <button className="modal-btn no-btn" onClick={onNo}>
            Cancel
          </button>
          <button className="modal-btn yes-btn" onClick={onYes}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
