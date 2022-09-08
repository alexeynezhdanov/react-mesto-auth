import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [cardName, setCardName] = useState('');
    const [cardLink, setCardLink] = useState('');

    //Чистим инпуты
    useEffect(() => {
        setCardName('');
        setCardLink('');
      }, [props.isOpen]);

    function handleCardName(e) {
        setCardName(e.target.value);
    };

    function handleCardLink(e) {
        setCardLink(e.target.value);
    };

    //Обработка формы
    function handleAddPlaceSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: cardName,
            link: cardLink
        });
    };

    return (
        <PopupWithForm
            isOpen={props.isOpen && 'popup_opened'}
            onSubmit={handleAddPlaceSubmit}
            name='card'
            title='Новое место'
            onClose={props.onClose}
            button='Создать'>

            <input
                type="text"
                className="popup__input"
                id="cardName"
                onChange={handleCardName}
                value={cardName}
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required />

            <span className="cardName-error">
            </span>

            <input
                type="url"
                className="popup__input"
                id="cardLink"
                onChange={handleCardLink}
                value={cardLink}
                placeholder="Ссылка на картинку"
                required />
            <span className="cardLink-error">
            </span>
        </PopupWithForm>
    )
};

export default AddPlacePopup;