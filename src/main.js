import PointsBoardController from "./controller/points-board.js";
import TripInfoView from "./view/trip-info.js";
import TripRouteView from "./view/trip-route.js";
import TripDatesView from "./view/trip-dates.js";
import TripCostView from "./view/trip-cost.js";
import ControlsMenuView from "./view/controls-menu.js";
import ControlsFilterView from "./view/controls-filter.js";

import {generatePoints} from "./model/point.js";
import {render} from "./utils/render.js";

const POINTS_COUNT = 22;
const dataPoints = generatePoints(POINTS_COUNT);

const tripInfoContainer = document.querySelector(`.trip-main`);
render(tripInfoContainer, new TripInfoView(), `afterbegin`);

const tripInfoMetadataContainer = document.querySelector(`.trip-info__main`);
render(tripInfoMetadataContainer, new TripRouteView(dataPoints));
render(tripInfoMetadataContainer, new TripDatesView(dataPoints));

const tripInfoPriceContainer = document.querySelector(`.trip-main__trip-info`);
render(tripInfoPriceContainer, new TripCostView(dataPoints));

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsContainer, new ControlsMenuView());
render(tripControlsContainer, new ControlsFilterView());

const pointsBoard = document.querySelector(`.trip-events`);
const pointsBoardController = new PointsBoardController(pointsBoard);
pointsBoardController.render(dataPoints);
