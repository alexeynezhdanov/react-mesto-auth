function ImagePopup(props) {
    return (
        <section className={`popup popup_view ${props.isOpenImagePopup}`}>
            <div className="popup__container-view">
                <img className="popup__image overlay" alt={` ${props.card.name}`} src={`${props.card.link}`} />
                <h3 className="popup__label">
                {props.card.name}
                </h3>
                <button onClick={props.onClose} type="button" className="popup__close">
                </button>
            </div>
        </section>
    );
}

export default ImagePopup;