class MoviesApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    } else {
      return res.json()
    }
  }

  getMovies() {
    return fetch(`${this._url}`, {
      headers: this._headers,
    })
    .then(this._getResponseData)
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default moviesApi;
