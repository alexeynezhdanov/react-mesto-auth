import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Отправка данных в стейт
    function handleEmail(e) {
        setEmail(e.target.value);
    };

    //Отправка данных в стейт
    function handlePassword(e) {
        setPassword(e.target.value);
    };

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.signin({
            password: password,
            email: email
        });
    };

    return (
        <main className="content">
            <section className="login">
            <Link to="/sign-up" className="login__inout">
            Регистрация
            </Link>
                <h1 className="login__title">Вход</h1>
                <form
                    name={`Login`}
                    onSubmit={handleSubmit}>

                    <input
                        type="text"
                        className="login__input"
                        onChange={handleEmail}
                        value={email}
                        placeholder="Email"
                        minLength="2"
                        maxLength="200"
                        required />

                    <input
                        type="text"
                        className="login__input"
                        onChange={handlePassword}
                        value={password}
                        placeholder="Пароль"
                        minLength="2"
                        maxLength="200"
                        required />

                    <button type="submit" className="login__button">
                        Войти
                    </button>
                </form>
            </section>
        </main>
    )
};

export default Login; 