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
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userCurrent, setUserCurrent] = useState({});
  const [loginCurrent, setLoginCurrent] = useState("");
  const [cardsCurrent, setCardsCurrent] = useState([]);
  const history = useHistory();

  //Получение данных профиля и массива карточек
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then((res) => {
          setUserCurrent(res[0]);
          setCardsCurrent(res[1]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //Проверка токена и при его наличии авторизация и переход на главную
  useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      auth
        .authentication(jwt)
        .then((res) => {
          setLoggedIn(true);
          setLoginCurrent(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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
    setIsImagePopupOpen(false);
    setIsStatusTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  //Изменение профиля, отправка данных на сервер
  function handleUpdateUser(newUserData) {
    api
      .changeProfile(newUserData.name, newUserData.about)
      .then((res) => {
        setUserCurrent(res);
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
        setUserCurrent(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Ставим и получаем лайки на сервере
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === userCurrent._id);
    const changeLikeCardStatus = isLiked ? "deleteLike" : "putLike";

    api[changeLikeCardStatus](card._id)
      .then((newCard) => {
        setCardsCurrent((state) =>
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
        setCardsCurrent([newCard, ...cardsCurrent]);
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
        setCardsCurrent((state) =>
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
  function handleRegistration(userRegistrationData) {
    auth
      .register(userRegistrationData.password, userRegistrationData.email)
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
  function handleAuthorization(userLoginData) {
    auth
      .authorization(userLoginData.password, userLoginData.email)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        setLoginCurrent(userLoginData.email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsStatusTooltipPopupOpen("Что-то пошло не так!" + err);
        setIsImageTooltipPopupOpen("popup__tooltip-icon_status_not-true");
      });
  }

  //Запрос на выход с авторизации
  function onSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setLoginCurrent("");
  }

  return (
    <CurrentUserContext.Provider value={userCurrent}>
      <Header currentLogin={loginCurrent} onSignOut={onSignOut} />

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
          currentCards={cardsCurrent}
        />

        <Route path="/sign-up">
          <Register signUp={handleRegistration} />
        </Route>

        <Route path="/sign-in">
          <Login signIn={handleAuthorization} />
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
        isOpen=""
        name="confirm-deletion"
        title="Вы уверены?"
        onClose={closeAllPopups}
        button="Да"
        buttonStyle="popup__button-confirm-deletion"
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;