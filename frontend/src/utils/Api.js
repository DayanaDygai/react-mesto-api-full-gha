export class Api {
  constructor({ url}) {
    this._url = url;
    this.changeLikeCardStatus = this.changeLikeCardStatus.bind(this);
  }

  _makeRequest(res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject();
  }

  //изменение информации о пользователе с сервера
  setUserInfo(name, about) {
    const token =localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        about
      }),
    });
  }

  //получение информации о пользователе с сервера
  getUserInfo() {
    const token =localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`, {
      credentials: "include",
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  //редактировать аватар
  editAvatar(avatarUrl) {
    const token =localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me/avatar`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }

  //метод получения карточек с сервера
  getAllCards() {
    const token =localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      credentials: "include",
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  //добавление новой карточки
  createCard({name, link}) {
    const token =localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  //удаление карточки
  delete(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
    });
  }

  deleteLike(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${id}/likes`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  addLike(id) {
    const token = localStorage.getItem('jwt');
    return this._makeRequest(`${this._url}/cards/${id}/likes`, {
      credentials: "include",
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.addLike(id) : this.deleteLike(id);
  }
}

const api = new Api({
  url: "https://api.daianamesto.students.nomoredomainsmonster.ru",
  // headers: {
  //   'Content-Type': 'application/json'
  // },
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
