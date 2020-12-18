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

const renderPoints = (pointListElement, points) => {
  points.forEach((point) => {
    const newPoint = new PointController(pointListElement);
    newPoint.render(point);
  });
};

export default class PointsBoard {
  constructor(container) {
    this._container = container;

    this._noPoinstView = new NoPointsView();
    this._sortView = new SortView();
    this._tripListView = new TripListView();
  }

  render(points) {
    const container = this._container.getElement();

    if (points.length === 0) { // если поинтов нет
      render(container, this._noPoinstView); // ставим заглушку
      return; // выходим
    }

    render(container, this._sortView);
    render(container, this._tripListView);

    const tripList = document.querySelector(`.trip-events__list`); // находим контейнер
    renderPoints(tripList, points); // рисуем поинты


    this._sortView.setSortTypeChangeHandler((sortType) => { // произошел клик по сортировке
      const sortedPoints = getSortedPoints(points, sortType); // получаем отсортированные данные

      tripList.innerHTML = ``; // чистим доску

      renderPoints(tripList, sortedPoints); // рисуем поинты с новыми данными
    });
  }
}
