function InfoTooltip({ isOpen, imageTooltip, textTooltip, onClose }) {
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