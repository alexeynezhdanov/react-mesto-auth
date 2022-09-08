function InfoTooltip(props) {

 const sectionInfoTooltipClassName = (
    `popup ${props.isOpen && 'popup_opened'}`
 )

    const statusTitle = (
        `${props.isOpen === 'ok' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`
    );

    const statusIconClassName = (
        `${props.isOpen === 'ok' ? 'profile__tooltip-icon_status_true' : 'profile__tooltip-icon_status_not-true'}`
    );

    return (
        <section className={sectionInfoTooltipClassName}>
            <div className="popup__info-tooltip">
                <div className={statusIconClassName}></div>
                <h3 className="popup__tooltip-title">{statusTitle}</h3>
                <button onClick={props.onClose} type="button" className="popup__close">
                </button>
            </div>
        </section>
    )
};

export default InfoTooltip;