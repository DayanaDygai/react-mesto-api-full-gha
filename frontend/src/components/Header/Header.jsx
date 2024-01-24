import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo_header from "../../images/logo_header.svg";

function Header({ userEmail, onSignOut }) {
  return (
    <header className={styles["header"]}>
      <img className={styles["header__logo"]} src={logo_header} alt="Место" />
      <Routes>
        <Route
          path="/"
          element={
            <span className={styles["header-content"]}>
              <span className={styles["header-email"]}>{userEmail}</span>
              <span
                to="/sign-in"
                className={styles["header-link"]}
                onClick={onSignOut}
              >
                Выйти
              </span>
            </span>
          }
        ></Route>

        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className={styles["header-link"]}>
              зарегестрироваться
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className={styles["header-link"]}>
              войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
