import TripRouteView from "../view/trip-route.js";
import TripDatesView from "../view/trip-dates.js";
import TripCostView from "../view/trip-cost.js";
import ControlsMenuView from "../view/controls-menu.js";
import FilterView from "../view/filter.js";
import FilterController from "../controller/filter.js";
import {render} from "../utils/render.js";


export default class Header {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._controlsMenuView = new ControlsMenuView();
    this._filterView = new FilterView();
  }

  render(points) {
    const container = this._container.getElement();

    const containerTripInfoElement = container.querySelector(`.trip-info`);
    render(containerTripInfoElement, new TripCostView(points));

    const containerContolsElement = container.querySelector(`.trip-controls`);
    render(containerContolsElement, this._controlsMenuView);
    // render(containerContolsElement, this._filterView);
    const filterController = new FilterController(containerContolsElement, this._pointsModel);
    filterController.render();

    if (points.length === 0) {
      return;
    }

    const containerTripRouteAndDateElement = container.querySelector(`.trip-info__route-and-date`);
    render(containerTripRouteAndDateElement, new TripRouteView(points));
    render(containerTripRouteAndDateElement, new TripDatesView(points));
  }
}
