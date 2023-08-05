import { useContext, useEffect, useState } from "react"
import React from "react";
import api from "../utils/Api.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__item">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={currentUser.avatar} alt="" />
          <div className="profile__button-wrapper">
            <button type="button" className="profile__avatar-button" onClick={onEditAvatar}></button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__edit-name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-profile" onClick={onEditProfile} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__edit-prof">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} aria-label="Добваить карточку"></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main