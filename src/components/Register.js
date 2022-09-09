import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const { signUp } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Отправка данных в стейт description
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  //Отправка данных в стейт description
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    signUp({
      password: password,
      email: email,
    });
  }

  return (
    <main className="content">
      <section className="register">
        <h1 className="register__title">Регистрация</h1>
        <form name={`Register`} onSubmit={handleSubmit}>
          <input
            type="text"
            className="register__input"
            onChange={handleEmail}
            value={email}
            placeholder="Email"
            minLength="2"
            maxLength="200"
            required
          />

          <input
            type="password"
            className="register__input"
            onChange={handlePassword}
            value={password}
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            required
          />

          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="register__caption">
          Уже зарегистрированы? Войти
        </Link>
      </section>
    </main>
  );
}

export default Register;