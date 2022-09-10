import { React } from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header({ onSignOut, currentLogin }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__registration-block">
        <Switch>
          <Route exact path="/">
            <p className="header__login">{currentLogin}</p>
            <Link to="/sign-in" className="header__out" onClick={onSignOut}>
              Выйти
            </Link>
          </Route>
          <Route exact path="/sign-in">
            <Link to="/sign-up" className="header__out">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to="/sign-in" className="header__out">
              Войти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;