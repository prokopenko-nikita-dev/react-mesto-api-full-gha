class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers
    }

    setAuthorization(token) {
        this._headers['Authorization'] = `Bearer ${token}`;
    }

    _getOriginalResponse(res) {
        console.log(res)
        if (res.ok) {
            return res.json();

        }
        return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
            .then(res => { return this._getOriginalResponse(res) });

    }

    getUser() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
            .then(res => { return this._getOriginalResponse(res) })
    }

    updateUserInfo({ name, about }) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name, about
            })
        })
            .then(res => { return this._getOriginalResponse(res) })
    }

    addCard(name, link) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name, link
            })
        })
            .then(res => { return this._getOriginalResponse(res) })
    }

    setUserAvatar({ avatar }) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(res => { return this._getOriginalResponse(res) })
    }

    deleteCard(id) {
        return fetch(this._baseUrl + '/cards/' + id, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => { return this._getOriginalResponse(res) })
    }

    changeLikeCardStatus(id, status) {
        return fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: status ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
            .then(res => { return this._getOriginalResponse(res) })
    }
}

const api = new Api({
    baseUrl: 'https://api.domainname.nikitapro.nomoreparties.co',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt') || " "}`,
        'Content-Type': 'application/json'
    }
});

export default api