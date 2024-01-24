import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      id="avatar"
      name="avatar"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <fieldset className="popup__input-container">
        <input
          type="url"
          className="popup__input popup__input_type_src"
          id="avatar-input"
          required
          placeholder="Ссылка на картинку"
          name="avatar"
          ref={avatarRef}
        />
        <span className="popup__input-error avatar-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
