export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  };

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._error(res));
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => res.json())
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
    method: 'GET',
    headers: this._headers
    })
    .then(res => this._error(res));
  };

  changeUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.nameProfile,
        about: data.jobProfile
      })
    })
    .then(res => this._error(res));
  };

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.titlePlaces,
          link: data.linkPlaces
        })
      })
      .then(res => this._error(res));
  };

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._error(res));
  };

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => this._error(res));
  };

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._error(res));
  };
  
  _error(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  };
};

