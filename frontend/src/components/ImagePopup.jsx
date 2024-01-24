import close_icon from "../images/close_icon.svg";
function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_image ${card ? "popup_opened" : ""}`}
      id="popup__image"
    >
      <div className="popup__container popup__container_img">
        <button
          className="popup__button-esc popup__button-esc_image"
          type="button"
          onClick={onClose}
        >
          <img className="popup__esc-icon " src={close_icon} alt="Нравится" />
        </button>
        <img className="popup__img" src={card?.link} alt={card?.name} />
        <h2 className="popup__img-title">{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
