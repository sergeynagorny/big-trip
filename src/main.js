import TripInfoView from "./view/trip-info.js";
import TripRouteView from "./view/trip-route.js";
import TripDatesView from "./view/trip-dates.js";
import TripCostView from "./view/trip-cost.js";
import ControlsMenuView from "./view/controls-menu.js";
import ControlsFilterView from "./view/controls-filter.js";
import SortView from "./view/sort.js";
import DaysListView from "./view/days-list.js";
import PointEditView from "./view/point-edit.js";

import {generatePoints} from "./model/point.js";
import {render} from "./utils.js";


const POINTS_COUNT = 15;
const dataPoints = generatePoints(POINTS_COUNT);


const tripInfoContainer = document.querySelector(`.trip-main`);
render(tripInfoContainer, new TripInfoView().getElement(), `afterbegin`);

const tripInfoMetadataContainer = document.querySelector(`.trip-info__main`);
render(tripInfoMetadataContainer, new TripRouteView(dataPoints).getElement());
render(tripInfoMetadataContainer, new TripDatesView(dataPoints).getElement());

const tripInfoPriceContainer = document.querySelector(`.trip-main__trip-info`);
render(tripInfoPriceContainer, new TripCostView(dataPoints).getElement());

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsContainer, new ControlsMenuView().getElement());
render(tripControlsContainer, new ControlsFilterView().getElement());

const tripBoard = document.querySelector(`.trip-events`);
render(tripBoard, new SortView().getElement());
render(tripBoard, new PointEditView(dataPoints[0]).getElement());
render(tripBoard, new DaysListView(dataPoints.slice(1)).getElement());

