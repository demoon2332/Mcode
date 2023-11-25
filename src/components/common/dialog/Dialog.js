import '../../../styles/components/common/dialog/index.css';

// standard dialog
const Dialog = ({ children, onClose }) => {
  return (
    <div className="dialog-container">
      <div className="dialog-header">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;