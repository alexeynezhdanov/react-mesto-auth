function InfoTooltip(props) {
  const { isOpen, imageTooltip, textTooltip, onClose } = props;
  const sectionInfoTooltipClassName = `popup ${isOpen && "popup_opened"}`;

  return (
    <section className={sectionInfoTooltipClassName}>
      <div className="popup__info-tooltip">
        <div className={imageTooltip}></div>
        <h3 className="popup__tooltip-title">{textTooltip}</h3>
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;