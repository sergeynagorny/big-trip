import PointView from "../view/point.js";
import PointEditView from "../view/point-edit.js";
import {render, replace} from "../utils/render.js";

const renderPoint = (container, point) => {
  pointView.setEditButtonClickHandler(() => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditView.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};


export default class PointController {
  constructor(container) {
    this._container = container;

    this._pointView = null;
    this._pointEditView = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point) {
    this._pointView = new PointView(point);
    this._pointEditView = new PointEditView(point);


    this._setupEventHandlers();
    render(this._container, this._pointView);
  }

  _setupEventHandlers() {
    this._pointView.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
    });

    this._pointEditView.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToPoint();
    });

    this._pointView.setFavoritesButtonClickHandler(() => {
    });
  }

  _replacePointToEdit() {
    replace(this._pointEditView, this._pointView);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToPoint() {
    replace(this._pointView, this._pointEditView);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
