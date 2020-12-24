import PointModel from "../model/point.js"; // Единичный поинт, а не общий

import PointView from "../view/point.js";
import PointEditView from "../view/point-edit.js";

import {render, remove, replace} from "../utils/render.js";


export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {
  destination: {
    name: ``,
  },
  date: {
    checkIn: new Date(),
    checkOut: new Date(),
  },
  type: `taxi`,
  price: 0,
  isFavorite: false,
};

const parseFormData = (formData, destinations) => {
  const city = document.querySelector(`#event-destination-1`).value;
  const selectedOffers = Array.from(document.querySelectorAll(
      `.event__offer-checkbox:checked + label[for^="event"]`));

  return new PointModel({
    'type': formData.get(`event-type`),
    'date_from': formData.get(`event-start-time`),
    'date_to': formData.get(`event-end-time`),
    'destination': {
      'name': destinations[city].name,
      'description': destinations[city].description,
      'pictures': destinations[city].pictures
    },
    'base_price': Number(formData.get(`event-price`)),
    'is_favorite': Boolean(formData.get(`event-favorite`)),
    'offers': selectedOffers.map((offer) => ({
      'title': offer.querySelector(`.event__offer-title`).textContent,
      'price': Number(offer.querySelector(`.event__offer-price`).textContent)
    })),
  });
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

  _setupEventHandlers() {
    this._pointView.setEditButtonClickHandler(() => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._replacePointToEdit();
    });

    this._pointEditView.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._pointEditView.getData();
      this._onDataChange(this, this._point, data);
    });

    this._pointEditView.setDeleteButtonClickHandler(() => {
      this._onDataChange(this, this._point, null);
    });

    this._pointView.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, this._point, Object.assign({}, this._point, {
        isFavorite: !this._point.isFavorite
      }));
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
