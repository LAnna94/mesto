export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    }
}

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  setProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

  setNewAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
}
