import React, { useState } from "react";

import styles from "./Login.module.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ password, email })
  };

  return (
    <section className={styles["login__page"]}>
      <div className={styles["login"]}>
        <h2 className={styles["title__login"]}>Вход</h2>
        <form className={styles["form__login"]} onSubmit={handleSubmit}>
          <fieldset className={styles["login__input-container"]}>
            <input
              type="email"
              className={styles["login__input"]}
              name="email"
              id="email"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {
              <span
                id="user-error"
                className="popup__input-error name-input-error"
              ></span>
            }
            <input
              type="password"
              className={styles["login__input"]}
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
          <button className={styles["login__button"]} type="submit">
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
