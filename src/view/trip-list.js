import {createElement} from '../utils.js';


const createTripListTemplate = () => {
  return (`
    <ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info"></div>
        <ul class="trip-events__list"></ul>
      </li>
    </ul>
  `);
};


export default class TripList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripListTemplate();
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
