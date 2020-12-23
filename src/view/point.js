import Abstract from "./abstract.js";
import {capitalizeFirstLetter, formatTypesGroup} from '../utils/common.js';


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

function calculateEventDuration(checkIn, checkOut) {
  const ms = checkOut - checkIn;

  let days = Math.floor(ms / (24 * 60 * 60 * 1000));
  let hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  let minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));

  days = days === 0 ? `` : setTimeUnitFormat(days, `D`);
  hours = hours === 0 ? `` : setTimeUnitFormat(hours, `H`);
  minutes = minutes === 0 ? `` : setTimeUnitFormat(minutes, `M`);

  return `${days}${hours}${minutes}`;
}

const createOffersMarkup = (offers) => {
  return Object.values(offers).slice(0, 3).map((offer) => {
    return (`
        <li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>&nbsp;&plus;&nbsp;&euro;
          <span class="event__offer-price">${offer.price}</span>
        </li>
      `);
  }).join(`\n`);
};

const createPointTemplate = (point) => {
  const {destination: {name}, date: {checkIn, checkOut}, price, type, offers} = point;

  const offersMarkup = createOffersMarkup(offers);
  const isFavorite = point.isFavorite ? `event__favorite-btn--active` : ``;

  return (`
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeFirstLetter(type)} ${formatTypesGroup(type)} ${name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${checkIn}">${formatTime(checkIn)}</time>
            &mdash;
            <time class="event__end-time" datetime="${checkOut}">${formatTime(checkOut)}</time>
          </p>
          <p class="event__duration">${calculateEventDuration(checkIn, checkOut)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">${offersMarkup}</ul>

        <button class="event__favorite-btn ${isFavorite}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>

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

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
  }
}
