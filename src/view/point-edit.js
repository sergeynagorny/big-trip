import AbstractSmart from "./abstract-smart.js";
import {capitalizeFirstLetter, formatTypesGroup} from '../utils/common.js';
import dayjs from 'dayjs';


const parseFormData = (formData, destinationMap, offersMap) => {
  const destinationInput = formData.get(`event-destination`);
  const type = formData.get(`event-type`);

  const selectedOffers = Array.from(document.querySelectorAll(`.event__offer-checkbox:checked`));
  const offers = selectedOffers.reduce((acc, item) => {
    acc[item.value] = offersMap[type].offers[item.value];
    return acc;
  }, {});

  return {
    destination: destinationMap[destinationInput.toLowerCase()] || {name: destinationInput},
    price: Number(formData.get(`event-price`)),
    type,
    offers,
    date: {
      checkIn: new Date(),
      checkOut: new Date(),
    },
  };
};

const createPointTypeListMarkup = (activeType, data) => {

  const typesGroup = Object.keys(data).reduce((acc, key) => {
    const group = data[key].group;
    if (acc[group]) {
      acc[group].push(key);
    } else {
      acc[group] = [key];
    }
    return acc;
  }, {});

  return Object.keys(typesGroup).map((item) => {
    return (`
    <fieldset class="event__type-group">
      <legend class="visually-hidden">${item}</legend>
      ${typesGroup[item].map((type) => {
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

const createOffersMarkup = (allOffers, activeOffers) => {
  const offersList = Object.keys(allOffers).map((key, index) => {
    const offer = allOffers[key];
    const isChecked = activeOffers.hasOwnProperty(key) ? `checked` : ``;
    const offerName = `event-offer-${offer.title.replace(/\s/g, `-`).toLowerCase()}`;
    const offerId = `${offerName}-${index}`;

    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" value="${key}" id="${offerId}" type="checkbox" name="event-offer" ${isChecked}>
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

const createInfoMarkup = (description, pictures) => {

  const createPhotosMarkup = () => {
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

  const createDescriptionMarkup = () => {
    return (`
      <p class="event__destination-description">${description}</p>
    `);
  };

  const photosMarkup = (description) ? createPhotosMarkup() : ``;
  const descriptionMarkup = (pictures) ? createDescriptionMarkup() : ``;

  return (description || pictures) ? (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${descriptionMarkup}
      ${photosMarkup}
    </section>
  `) : ``;
};

const formatInputTime = (time) => {
  return dayjs(time).format(`DD/MM/YY HH:mm`);
};

const createDestinationList = (destinations) => {
  return Object.values(destinations).map((item) => `<option value="${item.name}"></option>`).join(`\n`);
};

const createPointEditTemplate = (point, options = {}, destinationsData, offersData) => {
  const {date: {checkIn, checkOut}, price} = point;
  const {type, offers, destination: {name, description, pictures}} = options;

  const typeOffers = offersData[type].offers;
  const destinationListMarkup = createDestinationList(destinationsData);
  const typeListMarkup = createPointTypeListMarkup(type, offersData);
  const offersMarkup = createOffersMarkup(typeOffers, offers);
  const infoMarkup = createInfoMarkup(description, pictures);

  return (`
    <form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">${typeListMarkup}</div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">${capitalizeFirstLetter(type)} ${formatTypesGroup(type)}</label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationListMarkup}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatInputTime(checkIn)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatInputTime(checkOut)}">
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
      ${(offersMarkup || infoMarkup) ? `<section class="event__details">${offersMarkup} ${infoMarkup}</section>` : ``}
    </form>
  `);
};


export default class PointEdit extends AbstractSmart {
  constructor(point, destinations, offers) {
    super();

    this._point = point;
    this._destinations = destinations;
    this._offers = offers;

    this._submitHandler = null;
    this._deleteButtonClickHandler = null;

    this._destination = point.destination;
    this._type = point.type;
    this._activeOffers = point.offers;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPointEditTemplate(
        this._point,
        {
          destination: this._destination,
          type: this._type,
          offers: this._activeOffers,
        },
        this._destinations,
        this._offers
    );
  }

  removeElement() {
    // if (this._flatpickr) {
    //   this._flatpickr.destroy();
    //   this._flatpickr = null;
    // }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    const point = this._point;

    this._destination = point.destination;
    this._type = point.type;
    this._activeOffers = point.offers;

    this.rerender();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return parseFormData(formData, this._destinations, this._offers);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  _subscribeOnEvents() {
    const pointEdit = this.getElement();
    const eventsList = pointEdit.querySelector(`.event__type-list`);
    const destinationInput = pointEdit.querySelector(`.event__input--destination`);

    // const eventStartInput = pointEdit.querySelector(`input[name="event-start-time"]`);
    // const eventEndInput = pointEdit.querySelector(`input[name="event-end-time"]`);

    // eventStartInput.addEventListener(`click`, () => {
    //   this._checkIn = eventStartInput.value;
    //   this.rerender();
    // });

    // eventEndInput.addEventListener(`click`, () => {
    //   this._checkOut = eventEndInput.value;
    //   this.rerender();
    // });

    eventsList.addEventListener(`input`, (evt) => {
      this._type = evt.target.value;
      this._activeOffers = [];
      this.rerender();
    });

    destinationInput.addEventListener(`change`, () => {
      this._destination = this._destinations[destinationInput.value.toLowerCase()] || {name: destinationInput.value};
      this.rerender();
    });
  }
}
