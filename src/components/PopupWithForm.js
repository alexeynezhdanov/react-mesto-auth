function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <form
          name={`${props.name}`}
          onSubmit={props.onSubmit}
          className="popup__form overlay"
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className={`popup__button ${props.buttonStyle}`}
          >
            {props.button}
          </button>
        </form>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;