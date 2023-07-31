//components
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js";
import Register from './Register.js';
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

//react
import { useEffect, useState, useCallback } from "react"
import { Routes, Route, Navigate, useHistory, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js"
import React from "react";

//utils
import api from "../utils/Api.js";
import * as auth from "../utils/auth.js";

//popup
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";



function App() {

  const initialData = {
    email: ''}

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupImg, setisPopupImg] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [profileUserInfo, setProfileUserInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [data, setData] = useState(initialData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileEmail, setIsProfileEmail] = useState('')

  const history = useNavigate();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setisPopupImg(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setisPopupImg(false)
    setSelectedCard({});
  }

  // функция закрытия попапа
  const closePopup = () => {
    setIsInfoTooltipPopupOpen(false)
  }

  //Изменение Аватара пользователя
  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((profileUserInfo) => {
        setCurrentUser(profileUserInfo)
        console.log(profileUserInfo)
      })
      .catch((error) => console.log(error))
      .finally(() => closeAllPopups())
  }

  //Изменение информации о пользователе
  function handleUpdateUser(newUser) {
    api
      .updateUserInfo(newUser)
      .then((profileUserInfo) => {
        setCurrentUser(profileUserInfo)
        console.log(profileUserInfo)
      })
      .catch((error) => console.log(error))
      .finally(() => closeAllPopups())
  }

  useEffect(() => {
    api
      .getUser()
      .then((profileUserInfo) => {
        setCurrentUser(profileUserInfo)
        console.log(profileUserInfo)
      })
      .catch((error) => console.log(error));
  }, []);

  const [cards, setCards] = useState([]);


  //Лайк на карточке
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((error) => console.log(error))
  }


  //Удаление карточки 
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((error) => console.log(error))
  }

  //Добваление новой карточки
  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link).then((newCard) => {

      setCards([newCard, ...cards]);
    })
      .catch((error) => console.log(error))
      .finally(() => closeAllPopups());
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => console.log(error));
  }, []);


  // ---------- Функции запросов api/auth ----------
  // Проверка токена пользователя на подленность на сервере
  // проверка, что пользователь уже авторизован
  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      setIsAuthChecking(true);
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setData({
              email: res.data.email
            })
            history('/mesto');
          }
        })
        .catch(() => history('/sign-in'))
        .finally(() => setIsAuthChecking(false))
    } else {
      setIsAuthChecking(false)
    }
  }, [history])

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  // Регистрации пользователя на сервере
  const handleRegister = ({ password, email }) => {
    return auth.register({ password, email })
      .then(res => {
        if (!res || res.statusCode === 400) throw new Error(`Ошибка: ${res.message}`);
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(true);
        history.push('/sign-in')
        return res;
      })
      .catch(err => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        return err;
      })
  }

  // Авторизации пользователя
  const handleLogin = ({ password, email }) => {
    return auth.authorize({ password, email })
      .then(res => {
        if (!res || res.statusCode === 400 || res.statusCode === 401) throw new Error(`Ошибка: ${res.message}`);
        if (res.token) {
          setIsInfoTooltipPopupOpen(true);
          setIsSuccess(true);
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
        };
      })
      .then(tokenCheck)
      .catch(err => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        return err;
      })
  }

  // Выход из системы
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsProfileEmail('')
    setIsLoggedIn(false);
    history.push('/sign-in');
  }

  return (
  <div className="page__container">
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
      onLogout={handleLogout}
      isLoggedIn={isLoggedIn}
      isProfileEmail={isProfileEmail}
      />
      <Routes>
        <Route path="/mesto" element={
          <ProtectedRoute
            loggedIn={loggedIn}
            isLoading={isAuthChecking}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />
            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

            <PopupWithForm
              name="cards__trash"
              title={"Вы уверены?"}
              buttonText="Да"
              onClose={closeAllPopups}
            >
            </PopupWithForm>

            <ImagePopup
              isOpen={isPopupImg}
              card={selectedCard}
              onClose={closeAllPopups}
            >
            </ImagePopup>
          </ProtectedRoute>} />

        <Route path='/sign-in' exact element={
          <Login onLogin={handleLogin} />}>
        </Route>

        <Route path='/sign-up' exact element={
          <Register onRegister={handleRegister} />
        }>
        </Route>

        <Route path="*" element={loggedIn
          ? <Navigate to="/mesto" />
          : <Navigate to="/sign-in" />}>
        </Route>

      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closePopup}
        isSuccess={isSuccess}
      />
    </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
