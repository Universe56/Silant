import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import AppLogo from "./logo.jsx";

const AppHeader = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div className="app-container">
      <div className="header-container">
        <div className="app-logo">
          <AppLogo />
        </div>
        <div className="app-field">+7 (800) 555-35-35 telegram</div>
        {isAuth === true ? (
          <Fragment>
            {" "}
            <div className="app-field">
              <Link to="/logout">Выйти</Link>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {" "}
            <div className="app-field">
              <Link to="/login">Войти</Link>
            </div>
          </Fragment>
        )}
      </div>
      <div className="header-container">
        <div className="app-field">
          Электронная сервисная книжка "Мой Силант"
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
