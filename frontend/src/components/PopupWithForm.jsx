import React from "react";
import close_icon from "../images/close_icon.svg";
function PopupWithForm({
  name,
  isOpen,
  title,
  children,
  onClose,
  buttonText,
  onSubmit,
}) {
  return (
    <>
      <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container_form">
          <form
            className="popup__form"
            name={`popup__${name}`}
            onSubmit={onSubmit}
          >
            <button
              className="popup__button-esc"
              type="button"
              onClick={onClose}
            >
              <img
                className="popup__esc-icon"
                src={close_icon}
                alt="Нравится"
              />
            </button>
            <h2 className="popup__title">{title}</h2>
            {children}
            <button className="popup__button-save" type="submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
