import {createElement} from "../utils.js";


const getPointsDestinations = (data) => {
  return data.map((item) => item.destination)
    .filter((item, index) => (index === 0 || data[index - 1].destination !== data[index].destination) ? true : false)
    .join(` — `);
};

const createTripRouteTemplate = (points) => {
  const tripRoute = getPointsDestinations(points);

  return (
    `<h1 class="trip-info__title">${tripRoute}</h1>
  `);
};


export default class TripRoute {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripRouteTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
