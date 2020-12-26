import TripListView from "../view/trip-list.js";
import PointsListView from "../view/points-list.js";
import NoPointsView from "../view/no-points.js";
import SortView, {SortType} from "../view/sort.js";
import PointController, {Mode as PointControllerMode, EmptyPoint} from "./point.js";
import {render} from "../utils/render.js";


const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];

  switch (sortType) {
    case SortType.EVENT:
      sortedPoints = points.slice().sort((a, b) => a.date.checkIn - b.date.checkIn);
      break;
    case SortType.TIME:
      sortedPoints = points.slice().sort((a, b) => (b.date.checkOut - b.date.checkIn) - (a.date.checkOut - a.date.checkIn));
      break;
    case SortType.PRICE:
      sortedPoints = points.slice().sort((a, b) => b.price - a.price);
      break;
  }

  return sortedPoints;
};

const renderPoints = (container, points, destinations, offers, onDataChange, onViewChange, defaultSortType = true) => {
  let allControllers = [];

  if (defaultSortType) {
    const dates = getTripDates(points);

    dates.forEach((date, index) => {
      const pointsListView = new PointsListView(date, index + 1);
      const pointContainer = pointsListView.getPointsContainer();
      render(container, pointsListView);

      const newControllers = points
        .filter((point) => {
          return new Date(point.date.checkIn).toDateString() === date;
        })
        .map((point) => {
          const pointController = new PointController(pointContainer, destinations, offers, onDataChange, onViewChange);
          pointController.render(point, PointControllerMode.DEFAULT);

          return pointController;
        });

      allControllers = [].concat(allControllers, newControllers);
    });

    return allControllers;
  } else {
    const pointsListView = new PointsListView();
    const pointContainer = pointsListView.getPointsContainer();
    render(container, pointsListView);

    allControllers = points.map((point) => {
      const pointController = new PointController(pointContainer, destinations, offers, onDataChange, onViewChange);
      pointController.render(point, PointControllerMode.DEFAULT);

      return pointController;
    });

    return allControllers;
  }
};

const getTripDates = (points) => {
  return Array.from(new Set(points.map((point) => new Date(point.date.checkIn).toDateString())));
};

export default class PointsBoard {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._destinations = null;
    this._offers = null;

    this._showedPointControllers = [];
    this._tripListView = new TripListView();
    this._noPoinstView = new NoPointsView();
    this._sortView = new SortView();

    this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortView.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container.getElement();

    const points = this._pointsModel.getPoints();
    this._destinations = this._pointsModel.getDestinations();
    this._offers = this._pointsModel.getOffers();

    if (points.length === 0) {
      render(container, this._noPoinstView);
      return;
    }

    render(container, this._sortView, `afterbegin`);
    render(container, this._tripListView);

    this._renderPoints(points);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._sortView.setSortType(SortType.EVENT);
    this._updatePoints();

    const tripList = this._tripListView.getElement();
    this._creatingPoint = new PointController(tripList, this._destinations, this._offers, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, PointControllerMode.ADDING);
  }

  _removePoints() {
    this._tripListView.clear();
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _renderPoints(points) {
    const sortType = this._sortView.getSortType();
    const container = this._tripListView.getElement();

    switch (sortType) {
      case SortType.EVENT:
        const pointsDates = getTripDates(points);

        pointsDates.forEach((date, index) => {
          const pointsListView = new PointsListView(date, index + 1);
          const pointContainer = pointsListView.getPointsContainer();
          render(container, pointsListView);

          const filterPoints = points.filter((point) => {
            return new Date(point.date.checkIn).toDateString() === date;
          });

          const newControllers = this._renderPoint(pointContainer, filterPoints);
          this._showedPointControllers.concat(newControllers);
        });

        break;

      default:
        const pointsListView = new PointsListView();
        const pointContainer = pointsListView.getPointsContainer();
        render(container, pointsListView);

        this._showedPointControllers = this._renderPoint(pointContainer, points);

        break;
    }
  }

  _renderPoint(pointContainer, points) {
    return points.map((point) => {
      const pointController = new PointController(pointContainer, this._destinations, this._offers, this._onDataChange, this._onViewChange);
      pointController.render(point, PointControllerMode.DEFAULT);

      return pointController;
    });
  }

  _updatePoints() {
    const sortType = this._sortView.getSortType();
    const sortedPoints = getSortedPoints(this._pointsModel.getPoints(), sortType);

    this._removePoints();
    this._renderPoints(sortedPoints);
  }

  _onFilterChange() {
    this._updatePoints();
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;

      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newData);

        pointController.render(newData, PointControllerMode.DEFAULT);
        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
        this._updatePoints();
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
    }
  }

  _onSortTypeChange(sortType) {
    const sortedPoints = getSortedPoints(this._pointsModel.getPoints(), sortType);

    this._removePoints();
    this._renderPoints(sortedPoints);
  }
}
