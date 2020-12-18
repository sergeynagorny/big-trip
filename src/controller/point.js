import PointView from "../view/point.js";
import PointEditView from "../view/point-edit.js";
import {render, replace} from "../utils/render.js";

const renderPoint = (container, point) => {
  const replacePointToEdit = () => {
    replace(pointEditView, pointView);
  };

  const replaceEditToPoint = () => {
    replace(pointView, pointEditView);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const pointView = new PointView(point);
  pointView.setEditButtonClickHandler(() => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const pointEditView = new PointEditView(point);
  pointEditView.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, pointView);
};


export default class PointController {
  constructor(container) {
    this._container = container;
  }

  render(point) {
    renderPoint(this._container, point)
  }
}
