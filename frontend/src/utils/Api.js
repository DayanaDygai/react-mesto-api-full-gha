export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this.changeLikeCardStatus = this.changeLikeCardStatus.bind(this);
  }

  _makeRequest(url, options) {
    return fetch(url, options).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject();
    });
  }

  //изменение информации о пользователе с сервера
  setUserInfo(data) {
    return this._makeRequest(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      }),
    });
  }

  //получение информации о пользователе с сервера
  getUserInfo() {
    return this._makeRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  //редактировать аватар
  editAvatar(data) {
    return this._makeRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      }),
    });
  }

  //метод получения карточек с сервера
  getAllCards() {
    return this._makeRequest(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  //добавление новой карточки
  createCard(data) {
    return this._makeRequest(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  //удаление карточки
  delete(id) {
    return this._makeRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  deleteLike(id) {
    return this._makeRequest(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addLike(id) {
    return this._makeRequest(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.addLike(id) : this.deleteLike(id);
  }
}

const api = new Api({
  url: "https://api.daianamesto.students.nomoredomainsmonster.ru",
  headers: {
    'Content-Type': 'application/json'
  },
});

export default api;

//Токен: eda5b0b1-35bd-4b47-92b2-3de2fac0e53a
// Идентификатор группы: cohort-76

// инфо о пользователе: GET https://nomoreparties.co/v1/cohortId/users/me
//карточки с сервера: GET https://mesto.nomoreparties.co/v1/cohortId/cards
//редактирование профиля: PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me
//добавление новой карточки: POST https://mesto.nomoreparties.co/v1/cohortId/cards
//удалить карточку: DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId
//лайк: PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
//убрать лайк: DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
//сменить аватар: PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar

// fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Skłodowska Curie',
//     about: 'Physicist and Chemist'
//   })
// });
