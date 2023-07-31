import React from "react"

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={"popup popup_image" + (isOpen ? " popup_opened" : "")}>
      <div className="popup__container popup__container-img">
        <button type="button" onClick={onClose} className="popup__close popup__close_img"></button>
        <img className="popup__full-img" src={card.link} alt={card.name} />
        <h2 className="popup__name">{card.name}
        </h2>
      </div>
    </div>
  )
}

export default ImagePopup;