import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onUpdateCard }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setLink("");
      setTitle("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateCard({
      name: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      id="card"
      name="add-card"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      title="Новое место"
      buttonText="Создать"
    >
      <fieldset className="popup__input-container">
        <input
          minLength="2"
          maxLength="30"
          type="text"
          className="popup__input popup__input_type_title"
          id="title-input"
          required
          placeholder="Название"
          name="name"
          onChange={handleTitleChange}
        />
        <span
          id="title-error"
          className="popup__input-error title-input-error"
        ></span>
        <input
          type="url"
          className="popup__input popup__input_type_src"
          id="link-input"
          required
          placeholder="Ссылка на картинку"
          name="link"
          onChange={handleLinkChange}
        />
        <span className="popup__input-error link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
