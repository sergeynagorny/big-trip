import Abstract from "./abstract.js";

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


export default class TripRoute extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripRouteTemplate(this._points);
  }
}
