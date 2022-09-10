import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef("");

  //Чистим инпуты
  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  //Обработка формы
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      link: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen && "popup_opened"}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      onClose={onClose}
      button="Сохранить"
    >
      <input
        type="url"
        className="popup__input"
        id="avatarLink"
        ref={avatarRef}
        name={avatarRef.current.value}
        placeholder="Ссылка на картинку"
        required
      />

      <span className="avatarLink-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
