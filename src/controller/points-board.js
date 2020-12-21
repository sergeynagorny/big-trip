import TripListView from "../view/trip-list.js";
import NoPointsView from "../view/no-points.js";
import SortView, {SortType} from "../view/sort.js";
import {render} from "../utils/render.js";
import PointController from "./point.js";


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

const renderPoints = (container, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const pointController = new PointController(container, onDataChange, onViewChange);
    pointController.render(point);

    return pointController;
  });
};


export default class PointsBoard {
  constructor(container) {
    this._container = container;

    this._points = null;
    this._showedPointControllers = [];
    this._noPoinstView = new NoPointsView();
    this._sortView = new SortView();
    this._tripListView = new TripListView();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortView.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(points) {
    const container = this._container.getElement();
    this._points = points;

    if (this._points.length === 0) {
      render(container, this._noPoinstView);
      return;
    }

    render(container, this._sortView);
    render(container, this._tripListView);

    const tripList = this._tripListView.getElement().querySelector(`.trip-events__list`);
    this._showedPointControllers = renderPoints(tripList, this._points, this._onDataChange, this._onViewChange);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);
    if (index !== -1) {
      this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));
      pointController.render(newData);
    }
  }

  _onSortTypeChange(sortType) {
    const sortedPoints = getSortedPoints(this._points, sortType);

    const tripList = this._tripListView.getElement().querySelector(`.trip-events__list`);
    tripList.innerHTML = ``;

    this._showedPointControllers = renderPoints(tripList, sortedPoints, this._onDataChange, this._onViewChange);
  }
}
