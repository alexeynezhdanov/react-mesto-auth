class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this._handleResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  };

  // Регистрация пользователя
  register(password, email) {
    return fetch(this.baseUrl + `/signup/`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`
      })
    })
      .then(this._handleResponse)
  }

  // Аутентификация пользователя
  authorization(password, email) {
    return fetch(this.baseUrl + `/signin/`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`
      })
    })
      .then(this._handleResponse)
  }

  // Запрос на авторизацию
  authentication() {
    return fetch(this.baseUrl + `/users/me/`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(this._handleResponse)
  }
}

const auth = new Auth({
  baseUrl: `https://auth.nomoreparties.co`,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default auth;