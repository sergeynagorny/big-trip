import Abstract from "./abstract.js";
import {capitalizeFirstLetter} from '../utils/common.js';
import {prepositionsMap} from '../const.js';

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const setTimeUnitFormat = (unit, symbol) => {
  return unit.toString().padStart(2, `0`) + `${symbol} `;
};

function calculateEventDuration(time) {
  const ms = time.end - time.start;

  let days = Math.floor(ms / (24 * 60 * 60 * 1000));
  let hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  let minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));

  days = days === 0 ? `` : setTimeUnitFormat(days, `D`);
  hours = hours === 0 ? `` : setTimeUnitFormat(hours, `H`);
  minutes = minutes === 0 ? `` : setTimeUnitFormat(minutes, `M`);

  return `${days}${hours}${minutes}`;
}

const calculateOffersPrice = (offers) => {
  return offers.reduce((acc, it) => acc + it.price, 0);
};

const createOffersMarkup = (offers) => {
  return offers.slice(0, 3).map((offer) => {
    return (`
        <li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>&nbsp;&plus;&nbsp;&euro;
          <span class="event__offer-price">${offer.price}</span>
        </li>
      `);
  }).join(`\n`);
};

const createPointTemplate = (point) => {

  const city = point.destination;
  const preposition = prepositionsMap[point.typeInfo.type];
  const pointType = point.type;
  const dateStart = point.date.start;
  const dateEnd = point.date.end;
  const eventDuration = calculateEventDuration(point.date);
  const fullPrice = calculateOffersPrice(point.typeInfo.offers) + point.price;

  const offersMarkup = createOffersMarkup(point.typeInfo.offers);

  return (`
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeFirstLetter(pointType)} ${preposition} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart}">${formatTime(dateStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEnd}">${formatTime(dateEnd)}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${fullPrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">${offersMarkup}</ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
};


export default class Point extends Abstract {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
