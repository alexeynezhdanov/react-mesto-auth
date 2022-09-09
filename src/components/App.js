import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import api from "./../utils/Api";
import auth from "./../utils/Auth";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAllPlacePopupOpen, setIsAllPlacePopupOpen] = useState(false);
  const [isStatusTooltipPopupOpen, setIsStatusTooltipPopupOpen] = useState("");
  const [isImageTooltipPopupOpen, setIsImageTooltipPopupOpen] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState("close");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentLogin, setCurrentLogin] = useState("");
  const [currentCards, setCurrentCards] = useState([]);
  const history = useHistory();
  const getProfile = api.getProfile();
  const getInitialCards = api.getInitialCards();
  const jwt = localStorage.getItem("token");

  //Получение данных профиля и массива карточек
  useEffect(() => {
    if (loggedIn) {
      Promise.all([getProfile, getInitialCards])
        .then((res) => {
          setCurrentUser(res[0]);
          setCurrentCards(res[1]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //Проверка токена и при его наличии авторизация и переход на главную
  useEffect(() => {
    if (jwt) {
      auth
        .authentication(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentLogin(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [jwt]);

  function handleAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAllPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAllPlacePopupOpen(false);
    setIsImagePopupOpen("close");
    setIsStatusTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen("open");
  }

  //Изменение профиля, отправка данных на сервер
  function handleUpdateUser(newUserData) {
    api
      .changeProfile(newUserData.name, newUserData.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Изменение аватара, отправка данных на сервер
  function handleUpdateAvatar(newAvatarData) {
    api
      .changeAvatar(newAvatarData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Ставим и получаем лайки на сервере
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const changeLikeCardStatus = isLiked ? "deleteLike" : "putLike";

    api[changeLikeCardStatus](card._id)
      .then((newCard) => {
        setCurrentCards((state) =>
          state.map((existingCard) =>
            existingCard._id === card._id ? newCard : existingCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Добавляем карточку
  function handleAddCard(card) {
    api
      .addNewCard(card.name, card.link)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Удаляем карточку
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCurrentCards((state) =>
          state.filter((existingCard) =>
            existingCard._id === card._id ? "" : existingCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос на регистрацию
  function onRegister(createProfile) {
    auth
      .register(createProfile.password, createProfile.email)
      .then(() => {
        setIsStatusTooltipPopupOpen("Вы успешно зарегистрировались!");
        setIsImageTooltipPopupOpen("popup__tooltip-icon_status_true");
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsStatusTooltipPopupOpen("Что-то пошло не так! Попробуйте ещё раз.");
        setIsImageTooltipPopupOpen("popup__tooltip-icon_status_not-true");
      });
  }

  //Запрос на авторизацию
  function onLogin(createLogin) {
    auth
      .authorization(createLogin.password, createLogin.email)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        setCurrentLogin(createLogin.email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsStatusTooltipPopupOpen("Что-то пошло не так!" + err);
        setIsImageTooltipPopupOpen("popup__tooltip-icon_status_not-true");
      });
  }

  //Запрос на выход с авторизации
  function onSignOut(loggedIn) {
    if (loggedIn) {
      localStorage.removeItem("token");
      setLoggedIn(false);
      setCurrentLogin("");
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header currentLogin={currentLogin} onSignOut={onSignOut} />

      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Main}
          loggedIn={loggedIn}
          onEditAvatar={handleAvatarClick}
          onEditProfile={handleProfileClick}
          onEditAddPlaceClick={handleAddPlaceClick}
          onOpenPopupImage={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          currentCards={currentCards}
        />

        <Route path="/sign-up">
          <Register signUp={onRegister} />
        </Route>

        <Route path="/sign-in">
          <Login signIn={onLogin} />
        </Route>
      </Switch>

      <InfoTooltip
        imageTooltip={isImageTooltipPopupOpen}
        textTooltip={isStatusTooltipPopupOpen}
        isOpen={isStatusTooltipPopupOpen}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAllPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddCard}
      />

      <PopupWithForm
        isOpen="true"
        name="confirm-deletion"
        title="Вы уверены?"
        onClose={closeAllPopups}
        button="Да"
        buttonStyle="popup__button-confirm-deletion"
      />

      <ImagePopup
        card={selectedCard}
        isOpenImagePopup={isImagePopupOpen === "open" ? "popup_opened" : ""}
        onClose={closeAllPopups}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;