import { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from './../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [profileName, setProfileName] = useState('');
    const [profileDescription, setProfileDescription] = useState('');

    //Подстановка данных полученных с сервера в форму
    useEffect(() => {
        if (props.isOpen) {
        setProfileName(currentUser.name);
        setProfileDescription(currentUser.about);}
    }, [currentUser, props.isOpen]);

    //Отправка данных в стейт name
    function handleName(e) {
        setProfileName(e.target.value);
    };

    //Отправка данных в стейт description
    function handleDescription(e) {
        setProfileDescription(e.target.value);
    };

    //Обработка формы
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: profileName,
            about: profileDescription
        });
    };

    return (
        <PopupWithForm
            isOpen={props.isOpen && 'popup_opened'}
            onSubmit={handleSubmit}
            name='profile-info'
            title='Редактировать профиль'
            onClose={props.onClose}
            button='Сохранить'>

            <input
                type="text"
                className="popup__input"
                id="textName"
                onChange={handleName}
                value={profileName}
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required />

            <span
                className="textName-error">
            </span>

            <input
                type="text"
                className="popup__input"
                id="aboutMe"
                onChange={handleDescription}
                value={profileDescription}
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required />

            <span
                className="aboutMe-error">
            </span>
        </PopupWithForm>
    )
};

export default EditProfilePopup;