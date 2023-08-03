import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header = (props) => {
  const {
    onSignOut,
    userEmail,
    loggedIn
  } = props

  const path = useLocation().pathname

  // Стейт бургер-меню 
  const [isActive, setIsActive] = useState(false);

  // Функция переключения состояния бургер-меню
  const handleButton = () => {
    setIsActive(!isActive)
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      {loggedIn
        ? (<>
          <button type="button" className={`header__burger button ${isActive ? "active" : ""}`}
 onClick={handleButton}>
            <span></span>
          </button>
          <nav
            className={`header__menu 
      ${isActive
                ? "active"
                : ""}`}>
            <ul className="header__list">
              <li>
                <p className="header__email">{userEmail}</p>
              </li>
              <li>
                {path === "/mesto"}
                <button
                  className="button header__button header__button_type_exit"
                  onClick={onSignOut}>
                  Выйти
                </button>
              </li>
            </ul>
          </nav></>)
        :
        (path !== "/mesto" ? (<Link
          className="header__button header__button-register"
          to={path === "/sign-in" ? "/sign-up" : "/sign-in"}>
          {path === "/sign-in" ? "Регистрация" : "Вход"}
        </Link>) : (<div>{userEmail}<button className="button header__button header__button_type_exit"
          onClick={onSignOut}>Выйти</button></div>))}


    </header >
  );
}

export default Header;