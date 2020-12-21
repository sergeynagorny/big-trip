import PointView from "../view/point.js";
import PointEditView from "../view/point-edit.js";
import {render, remove, replace} from "../utils/render.js";

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._point = null;
    this._pointView = null;
    this._pointEditView = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point, mode) {
    this._point = point;
    this._mode = mode;

    const oldPointView = this._pointView;
    const oldPointEditView = this._pointEditView;

    this._pointView = new PointView(this._point);
    this._pointEditView = new PointEditView(this._point);
    this._setupEventHandlers();

    if (oldPointView && oldPointEditView) {
      replace(this._pointView, oldPointView);
      replace(this._pointEditView, oldPointEditView);
      this._replaceEditToPoint();
    } else {
      render(this._container, this._pointView);
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

  _replacePointToEdit() {
    this._onViewChange(); // при открытии любого, закрывает все остальные, кто имеет флаг ЭДИТ.
    replace(this._pointEditView, this._pointView);
    this._mode = Mode.EDIT;
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._pointEditView.reset(); // при закрытии, сбрасывает данные до дефолта

    if (document.contains(this._pointEditView.getElement())) {
      replace(this._pointView, this._pointEditView);
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
