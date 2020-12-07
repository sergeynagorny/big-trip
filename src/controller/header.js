import TripRouteView from "../view/trip-route.js";
import TripDatesView from "../view/trip-dates.js";
import TripCostView from "../view/trip-cost.js";
import ControlsMenuView from "../view/controls-menu.js";
import ControlsFilterView from "../view/controls-filter.js";
import {render} from "../utils/render.js";


export default class Header {
  constructor(container) {
    this._container = container;

    this._controlsMenuView = new ControlsMenuView();
    this._controlsFilterView = new ControlsFilterView();
  }

  render(points) {
    const container = this._container.getElement();

    const containerTripInfoElement = container.querySelector(`.trip-info`);
    render(containerTripInfoElement, new TripCostView(points));

    const containerContolsElement = container.querySelector(`.trip-controls`);
    render(containerContolsElement, this._controlsMenuView);
    render(containerContolsElement, this._controlsFilterView);

    if (points.length === 0) {
      return;
    }

    const containerTripRouteAndDateElement = container.querySelector(`.trip-info__route-and-date`);
    render(containerTripRouteAndDateElement, new TripRouteView(points));
    render(containerTripRouteAndDateElement, new TripDatesView(points));
  }
}
