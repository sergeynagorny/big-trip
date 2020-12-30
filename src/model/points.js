import {FilterType, SortType} from "../const.js";
import {createDestinationMap, createTypeOffersMap} from "../utils/common.js";
import {getPointsByFilter} from "../utils/filter.js";
import {getSortedPoints} from "../utils/sort.js";


export default class Points {
  constructor() {
    this._points = [];
    this._destinations = [];
    this._offers = [];

    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  // SETTERS

  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDestinations(destinations) {
    this._destinations = createDestinationMap(destinations);
  }

  setOffers(offers) {
    this._offers = createTypeOffersMap(offers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }


  // GETTERS

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  getDestinations() {
    return this._destinations;
  }

  getOffers() {
    return this._offers;
  }

  getPointsAll() {
    return getSortedPoints(this._points, SortType.EVENT);
  }


  // ADD, REMOVE, UPDATE

  addPoint(point) {
    this._points = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }


  // CHANGE HANDLERS

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
