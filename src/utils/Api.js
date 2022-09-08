class Api {
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

  // Запрос на все карточки
  getInitialCards() {
    return fetch(this.baseUrl + `/cards/`, {
      headers: this.headers
    })
    .then(this._handleResponse)
  }

  // Изменение профиля
  changeProfile(name, about) {
    return fetch(this.baseUrl + `/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
    .then(this._handleResponse)
  }

  // Запрос на загрузку профиля
  getProfile() {
    return fetch(this.baseUrl + `/users/me`, {
      headers: this.headers
    })
    .then(this._handleResponse)
  }

  // Добавление новой карточки
  addNewCard(name, link) {
    return fetch(this.baseUrl + `/cards/`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
    .then(this._handleResponse)
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(this.baseUrl + `/cards/` + id, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._handleResponse)
  }

  // Поставить лайк
  putLike(id) {
    return fetch(this.baseUrl + `/cards/` + id + `/likes/`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(this._handleResponse)
  }

  // Удалить лайк
  deleteLike(id) {
    return fetch(this.baseUrl + `/cards/` + id + `/likes/`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._handleResponse)
  }

  // Изменить аватар
  changeAvatar(item) {
    return fetch(this.baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: `${item.link}`
      })
    })
    .then(this._handleResponse)
  }
};

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-42`,
  headers: {
      authorization: 'b9b00096-e4e2-4fb1-a472-dd725ac3dacf',
      'Content-Type': 'application/json',
  }
});

export default api;