import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");

  //Подстановка данных полученных с сервера в форму
  useEffect(() => {
    if (currentUser && isOpen) {
      setProfileName(currentUser.name);
      setProfileDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  //Отправка данных в стейт name
  function handleChangeName(e) {
    setProfileName(e.target.value);
  }

  //Отправка данных в стейт description
  function handleChangeDescription(e) {
    setProfileDescription(e.target.value);
  }

  //Обработка формы
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: profileName,
      about: profileDescription,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen && "popup_opened"}
      onSubmit={handleSubmit}
      name="profile-info"
      title="Редактировать профиль"
      onClose={onClose}
      button="Сохранить"
    >
      <input
        type="text"
        className="popup__input"
        id="textName"
        onChange={handleChangeName}
        value={profileName}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />

      <span className="textName-error"></span>

      <input
        type="text"
        className="popup__input"
        id="aboutMe"
        onChange={handleChangeDescription}
        value={profileDescription}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />

      <span className="aboutMe-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;