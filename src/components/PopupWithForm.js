function PopupWithForm({
  name,
  isOpen,
  onSubmit,
  title,
  children,
  buttonStyle,
  button,
  onClose,
}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <form
          name={`${name}`}
          onSubmit={onSubmit}
          className="popup__form overlay"
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className={`popup__button ${buttonStyle}`}>
            {button}
          </button>
        </form>
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;