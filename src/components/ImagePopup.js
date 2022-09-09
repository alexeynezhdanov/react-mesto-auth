function ImagePopup(props) {
  const { isOpenImagePopup, card, onClose } = props;

  return (
    <section className={`popup popup_view ${isOpenImagePopup}`}>
      <div className="popup__container-view">
        <img
          className="popup__image overlay"
          alt={` ${card.name}`}
          src={`${card.link}`}
        />
        <h3 className="popup__label">{card.name}</h3>
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;