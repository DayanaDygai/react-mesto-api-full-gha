import React from "react";
import error__register from "../../images/error__register.svg";
import good__register from "../../images/good__register.svg";
import close_icon from "../../images/close_icon.svg";
import styles from "./InfoTooltip.module.css";

function InfoTooltip({ onClose, isStatus }) {
  const InfoTooltipImage =
    isStatus === "successfully" ? good__register : error__register;

  return (
    <section
      className={
        isStatus !== "" ? "popup popup_opened popup_animation" : "popup"
      }
      onMouseDown={onClose}
    >
      <div className={styles["popup__container-regist"]}>
        <button type="button" className="popup__button-esc" onClick={onClose}>
          {" "}
          <img
            className="popup__esc-icon"
            src={close_icon}
            alt="Нравится"
          />{" "}
        </button>
        <img
          className={styles["popup__registr-img"]}
          src={InfoTooltipImage}
          alt="infoTooltip"
        />
        <h2 className={styles["title__registr"]}>
          {isStatus === "successfully"
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
