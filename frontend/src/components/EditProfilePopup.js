import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    // Подписка на контекст
const currentUser = useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
}, [currentUser]);

function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }
    
    return ( <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} name={"edit"} title={"Редактировать профиль"} buttonText={"Сохранить"}>
    <input value={name || ""} onChange={event => setName(event.target.value)} placeholder="Имя" type="text" name="user-name" className="popup__input popup__input_type_name" required minLength="2"
      maxLength="40" />
    <span className="popup__input-error" id="user-name-error">Вы пропустили это поле</span>
    <input value={description || ""} onChange={event => setDescription(event.target.value)} placeholder="Занятие" type="text" name="user-prof" className="popup__input popup__input_type_prof" required minLength="2"
      maxLength="200" />
    <span className="popup__input-error" id="user-prof-error">Вы пропустили это поле</span>
</PopupWithForm>)
}

export default EditProfilePopup;