import AbstractSmart from "./abstract-smart.js";
import {capitalizeFirstLetter, formatTypesGroup} from '../utils/common.js';
import flatpickr from "flatpickr";
import {encode} from "he";
import "flatpickr/dist/flatpickr.min.css";

const DefaultData = {
  saveButtonText: `Save`,
  deleteButtonText: `Delete`,
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

  if (Object.keys(allOffers).length === 0) {
    return ``;
  }

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

  const photosMarkup = (pictures.length > 0) ? createPhotosMarkup() : ``;
  const descriptionMarkup = (description.length > 0) ? createDescriptionMarkup() : ``;


  return (photosMarkup && descriptionMarkup) ? (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${descriptionMarkup}
      ${photosMarkup}
    </section>
  `) : ``;
};

const createDestinationList = (destinations) => {
  return Object.values(destinations).map((item) => `<option value="${item.name}"></option>`).join(`\n`);
};

const createPointEditTemplate = (options = {}, destinationsData, offersData) => {
  const {isNewPoint, isFavorite, type, date: {checkIn, checkOut}, offers, destination: {name: currentName, description, pictures}, price, externalData} = options;

  const hiddenStyle = isNewPoint ? `style="display: none;"` : ``;

  const name = encode(currentName);

  const typeOffers = offersData[type].offers;
  const destinationListMarkup = createDestinationList(destinationsData);
  const typeListMarkup = createPointTypeListMarkup(type, offersData);
  const offersMarkup = createOffersMarkup(typeOffers, offers);
  const infoMarkup = createInfoMarkup(description, pictures);

  const isButtonSaveBlock = !!name && (checkIn < checkOut);

  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;

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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${checkIn}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${checkOut}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="0" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit"${isButtonSaveBlock ? `` : `disabled`}>${saveButtonText}</button>
        <button class="event__reset-btn" type="reset">${isNewPoint ? `Cancel` : deleteButtonText}</button>

        <input id="event-favorite-1" class="event__favorite-checkbox visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label ${hiddenStyle} class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button ${hiddenStyle} class="event__rollup-btn" type="button">
          <span class="visually-hidden">Close event</span>
        </button>

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
    this._favoriteButtonClickHandler = null;
    this._closeButtonClickHandler = null;

    this._flatpickrCheckIn = null;
    this._flatpickrCheckOut = null;
    this._isNewPoint = point.isNewPoint || false;
    this._externalData = DefaultData;

    this._destination = point.destination;
    this._dateCheckIn = point.date.checkIn;
    this._dateCheckOut = point.date.checkOut;
    this._type = point.type;
    this._activeOffers = point.offers;
    this._price = point.price;
    this._isFavorite = point.isFavorite;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPointEditTemplate(
        {
          isNewPoint: this._isNewPoint,
          externalData: this._externalData,
          price: this._price,
          destination: this._destination,
          type: this._type,
          offers: this._activeOffers,
          date: {
            checkIn: this._dateCheckIn,
            checkOut: this._dateCheckOut,
          },
          isFavorite: this._isFavorite,
        },
        this._destinations,
        this._offers
    );
  }

  removeElement() {
    if (this._flatpickrCheckIn || this._flatpickrCheckOut) {
      this._flatpickrCheckIn.destroy();
      this._flatpickrCheckIn = null;
      this._flatpickrCheckOut.destroy();
      this._flatpickrCheckOut = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    const point = this._point;

    this._destination = point.destination;
    this._type = point.type;
    this._price = point.price;
    this._activeOffers = point.offers;
    this._dateCheckIn = point.date.checkIn;
    this._dateCheckOut = point.date.checkOut;

    this.rerender();
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._closeButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, handler);

    this._favoriteButtonClickHandler = handler;
  }

  _applyFlatpickr() {
    if (this._flatpickrCheckIn || this._flatpickrCheckOut) {
      this._flatpickrCheckIn.destroy();
      this._flatpickrCheckIn = null;
      this._flatpickrCheckOut.destroy();
      this._flatpickrCheckOut = null;
    }

    const pointEdit = this.getElement();
    const eventStartInput = pointEdit.querySelector(`input[name="event-start-time"]`);
    const eventEndInput = pointEdit.querySelector(`input[name="event-end-time"]`);

    this._flatpickrCheckIn = flatpickr(eventStartInput, {
      altInput: true,
      dateFormat: `Y-m-d H:i`,
      altFormat: `d/m/y H:i`,
      allowInput: true,
      time_24hr: true,
      enableTime: true,
      defaultDate: this._dateCheckIn,
    });

    this._flatpickrCheckOut = flatpickr(eventEndInput, {
      altInput: true,
      dateFormat: `Y-m-d H:i`,
      altFormat: `d/m/y H:i`,
      allowInput: true,
      time_24hr: true,
      enableTime: true,
      defaultDate: this._dateCheckOut,
      minDate: this._dateCheckIn || `today`,
    });
  }

  disabledForm() {
    const pointEdit = this.getElement();
    const inputs = Array.from(pointEdit.querySelectorAll(`input`));
    const buttons = Array.from(pointEdit.querySelectorAll(`button`));
    const formElements = [].concat(inputs, buttons);

    formElements.forEach((element) => {
      element.disabled = true;
    });
  }

  _subscribeOnEvents() {
    const pointEdit = this.getElement();
    const eventsList = pointEdit.querySelector(`.event__type-list`);
    const destinationInput = pointEdit.querySelector(`.event__input--destination`);

    const eventStartInput = pointEdit.querySelector(`input[name="event-start-time"]`);
    const eventEndInput = pointEdit.querySelector(`input[name="event-end-time"]`);

    eventStartInput.addEventListener(`change`, () => {
      this._dateCheckIn = new Date(eventStartInput.value);
      this.rerender();
    });

    eventEndInput.addEventListener(`change`, () => {
      this._dateCheckOut = new Date(eventEndInput.value);
      this.rerender();
    });

    eventsList.addEventListener(`input`, (evt) => {
      this._type = evt.target.value;
      this._activeOffers = [];
      this.rerender();
    });

    destinationInput.addEventListener(`change`, () => {
      this._destination = this._destinations[destinationInput.value.toLowerCase()] || {name: destinationInput.value, description: ``, pictures: []};
      this.rerender();
    });
  }
}
