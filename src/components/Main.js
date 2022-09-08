import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { CurrentUserContext } from './../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__logged">
                    <p className="profile__login">
                        {props.loggedIn && props.currentLogin}
                    </p>
                    <Link to="/sign-in" onClick={props.onSignOut} className="profile__out">
                        выйти
                    </Link>
                </div>
                <div onClick={props.onEditAvatar} className="profile__edit-avatar">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__edit-name">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={props.onEditProfile} type="button" className="profile__edit-button">
                        </button>
                    </div>
                    <p className="profile__about-me">{currentUser.about}</p>
                </div>
                <button onClick={props.onEditAddPlaceClick} type="button" className="profile__add-button">
                </button>
            </section>

            <ul className="elements">
                {props.currentCards.map((card) => (
                    <li className="elements__element" key={card._id}>
                        <Card
                            card={card}
                            onCardClick={props.onOpenPopupImage}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete} />
                    </li>
                ))}
            </ul>
        </main>
    )
};

export default Main;