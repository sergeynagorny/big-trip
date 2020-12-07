import Abstract from "./abstract.js";
import {capitalizeFirstLetter} from '../utils/common.js';
import {prepositionsMap} from '../const.js';
import {dataTypes, Types} from "../model/types.js";
import dayjs from 'dayjs';


const createPointTypeListMarkup = (types, activeType) => {
  return Object.keys(types).map((typeGroup) => {
    return (`
    <fieldset class="event__type-group">
      <legend class="visually-hidden">${typeGroup}</legend>
      ${types[typeGroup].map((type) => {
        const isChecked = type === activeType ? `checked` : ``;
        return (`
          <div class="event__type-item">
            <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
          </div>
        `);
      }).join(``)}
    </fieldset>
    `);
  }).join(``);
};

const createOffersMarkup = (offers, activeOffers) => {

  const offersList = offers.map((offer, index) => {
    const isChecked = activeOffers.indexOf(offer) !== -1 ? `checked` : ``;
    const offerName = `event-offer-${offer.title.replace(/\s/g, `-`).toLowerCase()}`;
    const offerId = `${offerName}-${index}`;

    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${offerId}" type="checkbox" name="${offerName}" ${isChecked}>
        <label class="event__offer-label" for="${offerId}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `);
  }).join(`\n`);

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersList}
      </div>
    </section>
  `);
};

const createDestinationInfoMarkup = (destinationInfo) => {
  const {description: destinationDescription, pictures: destinationPictures} = destinationInfo;

  const createDestinationPhotosMarkup = (pictures) => {
    const pictureList = pictures.map((picture) => {
      return (`
        <img class="event__photo" src="${picture.src}" alt="${picture.description}">
      `);
    }).join(`\n`);

    return (`
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictureList}
        </div>
      </div>
    `);
  };

  const createDescriptionMarkup = (description) => {
    return (`
      <p class="event__destination-description">${description}</p>
    `);
  };

  const photosMarkup = (destinationPictures) ? createDestinationPhotosMarkup(destinationPictures) : ``;
  const descriptionMarkup = (destinationDescription) ? createDescriptionMarkup(destinationDescription) : ``;


  return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${descriptionMarkup}
      ${photosMarkup}
    </section>
  `);
};

const formatInputTime = (time) => {
  return dayjs(time).format(`DD/MM/YY HH:mm`);
};

// TODO: datalist

const createPointEditTemplate = (point) => {
  const {destinationInfo, price, destination, type: pointType, typeInfo: {offers: activeOffers}} = point;

  const dateStart = formatInputTime(point.date.start);
  const dateEnd = formatInputTime(point.date.end);
  const preposition = prepositionsMap[point.typeInfo.type];
  const pointTypeListMarkup = createPointTypeListMarkup(Types, pointType);

  const typeOffers = dataTypes[pointType].offers;
  const offersMarkup = (typeOffers) ? createOffersMarkup(typeOffers, activeOffers) : ``;
  const destinationInfoMarkup = (destinationInfo) ? createDestinationInfoMarkup(destinationInfo) : ``;

  return (`
    <form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">${pointTypeListMarkup}</div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">${capitalizeFirstLetter(pointType)} ${preposition}</label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      ${(offersMarkup || destinationInfoMarkup) ? `<section class="event__details">${offersMarkup} ${destinationInfoMarkup}</section>` : ``}
    </form>
  `);
};


export default class PointEdit extends Abstract {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createPointEditTemplate(this._point);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }
}
