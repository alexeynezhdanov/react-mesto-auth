import { useContext } from "react";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";

function Card(props) {
  const { card } = props;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `elements__basket ${
    isOwn ? "elements__basket_visible" : "elements__basket_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;

  function handleOnCardClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleCardDelete() {
    props.onCardDelete(card);
  }

  return (
    <>
      <img
        onClick={handleOnCardClick}
        className="elements__photo"
        alt={`${card.name}`}
        src={`${card.link}`}
      />
      <div className="elements__place">
        <h3 className="elements__caption">{card.name}</h3>
        <div className="elements__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <h4 className="elements__likes-sum">{card.likes.length}</h4>
        </div>
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleCardDelete}
        ></button>
      </div>
    </>
  );
}

export default Card;