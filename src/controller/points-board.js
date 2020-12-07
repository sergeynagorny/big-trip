import TripListView from "../view/trip-list.js";
import NoPointsView from "../view/no-points.js";
import SortView, {SortType} from "../view/sort.js";
import PointView from "../view/point.js";
import PointEditView from "../view/point-edit.js";
import {render, replace} from "../utils/render.js";


const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];

  switch (sortType) {
    case SortType.EVENT:
      sortedPoints = points;
      break;
    case SortType.TIME:
      sortedPoints = points.slice().sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
      break;
    case SortType.PRICE:
      sortedPoints = points.slice().sort((a, b) => b.price - a.price);
      break;
  }

  return sortedPoints;
};

const renderPoints = (pointListElement, points) => {
  points.forEach((point) => {
    renderPoint(pointListElement, point);
  });
};

const renderPoint = (tripList, point) => {

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

  render(tripList, pointView);
};


export default class PointsBoard {
  constructor(container) {
    this._container = container;

    this._noPoinstView = new NoPointsView();
    this._sortView = new SortView();
    this._tripListView = new TripListView();
  }

  render(points) {
    const container = this._container; // Не забыть добавить .getContent() после рефакторинга

    if (points.length === 0) {
      render(container, this._noPoinstView);
      return;
    }

    render(container, this._sortView);
    render(container, this._tripListView);

    const tripList = document.querySelector(`.trip-events__list`);
    renderPoints(tripList, points);


    this._sortView.setSortTypeChangeHandler((sortType) => {
      const sortedPoints = getSortedPoints(points, sortType);

      tripList.innerHTML = ``;

      renderPoints(tripList, sortedPoints);
    });
  }
}
