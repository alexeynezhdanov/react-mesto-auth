import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import api from './../utils/Api';
import auth from './../utils/Auth';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from './../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAllPlacePopupOpen, setAllPlacePopupOpen] = useState(false);
  const [isStatusTooltipPopupOpen, setStatusTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setOpenPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentLogin, setCurrentLogin] = useState('');
  const [currentCards, setCurrentCards] = useState([]);
  const history = useHistory();


  //Получение данных профиля
  useEffect(() => {
    api.getProfile()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  //Получение данных массива карточек
  useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCurrentCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  //Проверка токена и при его наличии авторизация и переход на главную
  useEffect(() => {
    const jwt = localStorage.getItem('token')
    if (jwt) {
      auth.authentication(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentLogin(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, []);


  function handleAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleProfileClick() {
    setProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAllPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAllPlacePopupOpen(false);
    setOpenPopup(false);
    setStatusTooltipPopupOpen(false);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setOpenPopup(true);
  };

  //Изменение профиля, отправка данных на сервер
  function handleUpdateUser(item) {
    api.changeProfile(item.name, item.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //Изменение аватара, отправка данных на сервер
  function handleUpdateAvatar(item) {
    api.changeAvatar(item)
      .then((res) => {
        currentUser.avatar = res.avatar;
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //Ставим и получаем лайки на сервере
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const changeLikeCardStatus = isLiked ? 'deleteLike' : 'putLike';

    api[changeLikeCardStatus](card._id)
      .then((newCard) => {
        setCurrentCards((state) => state.map((existingCard) => existingCard._id === card._id ? newCard : existingCard));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Добавляем карточку
  function handleAddCard(card) {
    api.addNewCard(card.name, card.link)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //Удаляем карточку
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCurrentCards((state) => state.filter((existingCard) => existingCard._id === card._id ? '' : existingCard));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //Запрос на регистрацию
  function onRegister(item) {
    auth.register(item.password, item.email)
      .then((res) => {
        console.log(res)
        setStatusTooltipPopupOpen('ok');
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setStatusTooltipPopupOpen('err');
      })
  };

  //Запрос на авторизацию
  function onLogin(item) {
    auth.authorization(item.password, item.email)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setCurrentLogin(item.email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      })
  };

  //Запрос на выход с авторизации
  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentLogin('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header />

      <Switch>
        <ProtectedRoute exact path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditAvatar={handleAvatarClick}
          onEditProfile={handleProfileClick}
          onEditAddPlaceClick={handleAddPlaceClick}
          onOpenPopupImage={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          currentCards={currentCards}
          onSignOut={onSignOut}
          currentLogin={currentLogin} >
        </ProtectedRoute>

        <Route path="/sign-up">
          <Register
            signup={onRegister}
            onClose={closeAllPopups} />
        </Route>

        <Route path="/sign-in">
          <Login
            signin={onLogin}
            onClose={closeAllPopups} />
        </Route>

      </Switch>

      <InfoTooltip
        isOpen={isStatusTooltipPopupOpen}
        onClose={closeAllPopups} />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />

      <AddPlacePopup
        isOpen={isAllPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddCard} />

      <PopupWithForm
        isOpen='true'
        name='confirm-deletion'
        title='Вы уверены?'
        onClose={closeAllPopups}
        button='Да'
        buttonStyle='popup__button-confirm-deletion'>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        isOpenImagePopup={isImagePopupOpen === true ? 'popup_opened' : ''}
        onClose={closeAllPopups} />
      <Footer />
    </CurrentUserContext.Provider >
  );
}

export default App;