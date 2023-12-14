// Modal.js

import React, { useRef, useState } from "react";
import "../../../styles/components/common/modal/index.css";

const Modal = ({ title, isVisible, children, onYes, onNo, onClose, setIsVisible }) => {
  const modalRef = useRef(null);


  const clickOnClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const clickNo = () => {
    setIsVisible(false);
    if (onNo) onNo();
  };

  const clickYes = () => {
    setIsVisible(false);
    if (onYes) onYes();
  };

  return (
    <div ref={modalRef} className={`modal-container ${isVisible ? "" : "modal-container-hidden"}`}>
      <div className={`modal  ${isVisible ? "modal-visible" : "modal-hidden"}`}>
        <div className="modal-header">
          {title ? title : "Modal Title"} 
          <button className="circle-close-btn" onClick={clickOnClose}></button>
        </div>

        {/* Pass the setModalVisibility function to children */}
        <div className="modal-content">
          {children ? children : "Content is empty "}
        </div>

        <div className="modal-footer">
          <button className="btn cancel-btn" onClick={clickNo}>
            Cancel
          </button>
          <button className="btn success-btn" onClick={clickYes}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
