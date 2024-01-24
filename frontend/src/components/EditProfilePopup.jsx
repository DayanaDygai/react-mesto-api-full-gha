import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlesDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      id="profile"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <fieldset className="popup__input-container">
        <input
          minLength="2"
          maxLength="40"
          autoComplete="off"
          type="text"
          className="popup__input popup__input_type_name"
          id="name-input"
          placeholder="Ваше Имя"
          name="name"
          value={name || ""}
          onChange={handleNameChange}
          required
        />
        <span
          id="user-error"
          className="popup__input-error name-input-error"
        ></span>
        <input
          minLength="2"
          maxLength="200"
          type="text"
          className="popup__input popup__input_type_work"
          id="about-input"
          placeholder="Место работы"
          name="about"
          value={description || ""}
          onChange={handlesDescriptionChange}
          required
        />
        <span
          id="work-error"
          className="popup__input-error about-input-error"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
