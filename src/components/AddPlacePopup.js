import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const {isOpen, onClose} = props; 
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  //Чистим инпуты
  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  //Обработка формы
  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen && "popup_opened"}
      onSubmit={handleAddPlaceSubmit}
      name="card"
      title="Новое место"
      onClose={onClose}
      button="Создать"
    >
      <input
        type="text"
        className="popup__input"
        id="cardName"
        onChange={handleChangeCardName}
        value={cardName}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />

      <span className="cardName-error"></span>

      <input
        type="url"
        className="popup__input"
        id="cardLink"
        onChange={handleChangeCardLink}
        value={cardLink}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="cardLink-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;