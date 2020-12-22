export default class API {
  constructor(url, authorization) {
    this._authorization = authorization;
    this._url = url;
  }

  getTasks() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(this._url, {headers})
      .then((response) => response.json());
  }
}
