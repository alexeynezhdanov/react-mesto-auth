import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onEditAddPlaceClick,
  currentCards,
  onOpenPopupImage,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cardsElements = currentCards.map((card) => (
    <li className="elements__element" key={card._id}>
      <Card
        card={card}
        onCardClick={onOpenPopupImage}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    </li>
  ));

  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__edit-avatar">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </div>
        <div className="profile__info">
          <div className="profile__edit-name">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__edit-button"
            ></button>
          </div>
          <p className="profile__about-me">{currentUser.about}</p>
        </div>
        <button
          onClick={onEditAddPlaceClick}
          type="button"
          className="profile__add-button"
        ></button>
      </section>

      <ul className="elements">{cardsElements}</ul>
    </main>
  );
}

export default Main;