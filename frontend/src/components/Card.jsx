import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__button-like_active"
  }`;
  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <article className="card">
      <img
        className="card__img"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="card__remove-button"
          onClick={handleDeleteClick}
          type="button"
        ></button>
      )}
      <div className="card__list">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-conteiner">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLike}
            type="button"
          ></button>
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
