import PointModel from "../model/point.js"; // Единичный поинт, а не общий

import PointView from "../view/point.js";
import PointEditView from "../view/point-edit.js";

import {render, remove, replace} from "../utils/render.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const parseFormData = (formData, destinationMap, offersMap) => {
  const destinationInput = formData.get(`event-destination`);
  const type = formData.get(`event-type`);

  const eventStartInput = document.querySelector(`input[name="event-start-time"]`);
  const eventEndInput = document.querySelector(`input[name="event-end-time"]`);

  const selectedOffers = Array.from(document.querySelectorAll(`.event__offer-checkbox:checked`));
  const offers = selectedOffers.reduce((acc, item) => {
    acc[item.value] = offersMap[type].offers[item.value];
    return acc;
  }, {});

  return new PointModel({
    'destination': destinationMap[destinationInput.toLowerCase()],
    'base_price': Number(formData.get(`event-price`)),
    'type': type,
    'offers': Object.values(offers),
    'is_favorite': false,
    'date_from': eventStartInput.value,
    'date_to': eventEndInput.value,
  });
};

const createEmptyPointDate = () => {
  const checkIn = new Date();
  const checkOut = new Date();
  checkOut.setHours(checkIn.getHours() + 1);

  return {
    checkIn,
    checkOut,
  };
};

export const EmptyPoint = {
  destination: {
    name: ``,
  },
  date: createEmptyPointDate(),
  offers: {},
  type: `taxi`,
  price: 0,
  isFavorite: false,
};

export default class PointController {
  constructor(container, destinations, offers, onDataChange, onViewChange) {
    this._container = container;
    this._destinations = destinations;
    this._offers = offers;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._point = null;
    this._pointView = null;
    this._pointEditView = null;

    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point, mode) {
    this._point = point;
    this._mode = mode;

    const oldPointView = this._pointView;
    const oldPointEditView = this._pointEditView;

    this._pointView = new PointView(this._point, this._destinations, this._offers);
    this._pointEditView = new PointEditView(this._point, this._destinations, this._offers);
    this._setupEventHandlers();

    switch (mode) {
      case Mode.DEFAULT:
        if (oldPointView && oldPointEditView) {
          replace(this._pointView, oldPointView);
          replace(this._pointEditView, oldPointEditView);
          this._replaceEditToPoint();
        } else {
          render(this._container, this._pointView);
        }
        break;
      case Mode.ADDING:
        if (oldPointView && oldPointEditView) {
          remove(oldPointView);
          remove(oldPointEditView);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._pointEditView, `afterbegin`);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  destroy() {
    remove(this._pointView);
    remove(this._pointEditView);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._pointEditView.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._pointView.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._pointEditView.getElement().style.animation = ``;
      this._pointView.getElement().style.animation = ``;

      this._pointEditView.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _setupEventHandlers() {
    this._pointView.setEditButtonClickHandler(() => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._replacePointToEdit();
    });

    this._pointEditView.setSubmitHandler((evt) => {
      evt.preventDefault();

      const formData = this._pointEditView.getData();
      const data = parseFormData(formData, this._destinations, this._offers);

      this._pointEditView.setData({
        saveButtonText: `Saving...`,
      });

      this._pointEditView.disabledForm();

      this._onDataChange(this, this._point, data);
    });

    this._pointEditView.setDeleteButtonClickHandler(() => {
      this._pointEditView.setData({
        deleteButtonText: `Deleting...`,
      });

      this._pointEditView.disabledForm();

      this._onDataChange(this, this._point, null);
    });

    this._pointView.setFavoritesButtonClickHandler(() => {
      const newPoint = PointModel.clone(this._point);
      newPoint.isFavorite = !newPoint.isFavorite;

      this._onDataChange(this, this._point, newPoint);
    });
  }

  _replacePointToEdit() { // +
    this._onViewChange();
    replace(this._pointEditView, this._pointView);
    this._mode = Mode.EDIT;
  }

  _replaceEditToPoint() { // +-
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._pointEditView.reset();

    if (document.contains(this._pointEditView.getElement())) { // можно попробовать убрать этот IF
      replace(this._pointView, this._pointEditView);
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }

      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
