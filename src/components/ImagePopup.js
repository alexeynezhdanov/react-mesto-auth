function ImagePopup({ isOpen, card, onClose }) {
  return (
    <section className={`popup popup_view ${isOpen && "popup_opened"}`}>
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
