import { useContext, useState, useEffect, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const nameRef = useRef();
    const linkRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        onAddPlace(nameRef.current.value, linkRef.current.value)
    }

    useEffect(() => {
        nameRef.current.value = ''
        linkRef.current.value = ''
      }, [isOpen]);

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} name={"add"} title={"Новое место"} buttonText={"Создать"}>
            <input ref={nameRef} required minLength="2" maxLength="30" type="text" id="text" placeholder="Название" name="title"
                className="popup__input popup__input_type_name" />
            <span className="popup__input-error" id="title-error">Вы пропустили это поле</span>
            <input ref={linkRef} required type="url" id="link" placeholder="Ссылка на картинку" name="src"
                className="popup__input popup__input_type_prof" />
            <span className="popup__input-error" id="src-error">Введите адрес сайта</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;