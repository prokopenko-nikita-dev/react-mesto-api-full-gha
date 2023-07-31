import { useContext, useState, useEffect, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
const ref = useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: ref.current.value
        });
      }

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} name={"editAvatar"} title={"Обновить аватар"} buttonText={"Сохранить"}>
            <input ref={ref} required type="url" placeholder="Ссылка на аватар" name="link"
                className="popup__input popup__input_type_avatar" />
            <span className="popup__input-error" id="link-error">Введите адрес сайта</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;