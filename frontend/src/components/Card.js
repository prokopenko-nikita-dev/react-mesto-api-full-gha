import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);


  function handleCardClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `cards__trash  ${isOwn ? '' : 'cards__trash_inactive'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = isLiked ? 'cards__info-like cards__info-like_active' : 'cards__info-like';

  return (
    <li className="cards">
      <div className="cards__container">
        <img className="cards__img" src={card?.link || ""} alt={card && card.name} onClick={handleCardClick} />
        <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
      </div>
      <div className="cards__info">
        <h2 className="cards__info-heading">{card.name}</h2>
        <div className="cards__info-wrapper">
          <button aria-label="like" type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
          <span className="cards__info-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;