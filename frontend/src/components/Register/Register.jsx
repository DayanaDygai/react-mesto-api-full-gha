/* eslint-disable no-undef */
import React, { useState } from "react";
import { Link} from "react-router-dom";
import styles from "./Register.module.css";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(password, email).then(() => {
      navigate("/sign-in");
      console.log(onRegister);
    });
  };

  return (
    <section className={styles["registr"]}>
      <div className={styles["registr__container"]}>
        <h2 className={styles["title__registr"]}>Регистрация</h2>
        <form className={styles["form__registr"]} onSubmit={handleSubmit}>
          <fieldset className={styles["registr__input-container"]}>
            <input
              type="email"
              className={styles["registr__input"]}
              name="email"
              id="email"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <span
              id="user-error"
              className="popup__input-error name-input-error"
            ></span>
            <input
              type="password"
              className={styles["registr__input"]}
              name="password"
              id="password"
              placeholder="Пароль"
              required
              minLength="6"
              maxLength="20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              id="work-error"
              className="popup__input-error about-input-error"
            ></span>
          </fieldset>
          <button className={styles["registr__button"]} type="submit">
            Регистрация
          </button>
        </form>

        <div className={styles["register__signin-conteiner"]}>
          <Link to="/sign-in" className={styles["register__signin-link"]}>
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
