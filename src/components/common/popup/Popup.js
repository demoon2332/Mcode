import "../../../styles/components/common/popup/index.css";

// standard popup
const Popup = ({ children, onClose, title, isVisible, setIsVisible, type }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "danger":
        return "red";
      case "success":
        return "var(--successColor)";
      case "warning":
        return "orange";
      case "info":
        return "lightblue";
      default:
        return "white"; // Default color if type is not recognized
    }
  };

  const handleOnClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`popup-container ${isVisible ? "" : "popup-hidden"}`}>
      <div
        className="popup-content"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "25px",
            alignItems: "center",
            fontSize: "1rem",
          }}
        >
          <div className="popup-title">{title ? title : "Title is empty"}</div>
          <div style={{ width: "20px" }}></div>
        </div>
        <div className="popup-body">
          {children ? children : "Content is empty"}
        </div>
        <button className="close-button" onClick={handleOnClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Popup;
