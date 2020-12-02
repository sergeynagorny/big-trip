import {createElement} from "../utils.js";
import dayjs from 'dayjs';


const getDates = (data) => {

  // TODO: data.slice().splice(1, arr.length - 2);

  const start = data[0].date.start;
  const end = data[data.length - 1].date.end;

  const formatStart = dayjs(start).format(`MMM DD`);
  const formatEnd = dayjs(start).get(`month`) === dayjs(end).get(`month`) ? dayjs(end).format(`DD`) : dayjs(end).format(`MMM DD`);

  return [formatStart, formatEnd].join(` — `);
};

const createInfoDatesTemplate = (points) => {
  const dates = getDates(points);

  return (`
    <p class="trip-info__dates">${dates}</p>
  `);
};


export default class TripDates {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createInfoDatesTemplate(this._points);
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
