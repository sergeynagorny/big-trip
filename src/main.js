import {createTripInfoTemplate} from "./view/trip-info.js";
import {createInfoTitleTemplate} from "./view/info-title.js";
import {createInfoDatesTemplate} from "./view/info-dates.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createControlsMenuTemplate} from "./view/controls-menu.js";
import {createControlsFilterTemplate} from "./view/controls-filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createDaysListTemplate} from "./view/days-list.js";
import {createDaysItemTemplate} from "./view/days-item.js";
import {createPointEditTemplate} from "./view/point-edit.js";
import {generatePoints} from "./model/point.js";
import dayjs from 'dayjs';

const POINTS_COUNT = 15;
const dataPoints = generatePoints(POINTS_COUNT);

const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};


const tripInfoContainer = document.querySelector(`.trip-main`);
render(tripInfoContainer, createTripInfoTemplate(), `afterBegin`);

const tripInfoMetadataContainer = document.querySelector(`.trip-info__main`);
render(tripInfoMetadataContainer, createInfoTitleTemplate(dataPoints));
render(tripInfoMetadataContainer, createInfoDatesTemplate(dataPoints));

const tripInfoPriceContainer = document.querySelector(`.trip-main__trip-info`);
render(tripInfoPriceContainer, createTripCostTemplate(dataPoints));

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsContainer.querySelector(`h2:nth-of-type(1)`), createControlsMenuTemplate(), `afterEnd`);
render(tripControlsContainer.querySelector(`h2:nth-of-type(2)`), createControlsFilterTemplate(), `afterEnd`);


const tripBoard = document.querySelector(`.trip-events`);
render(tripBoard, createSortTemplate());
render(tripBoard, createPointEditTemplate(dataPoints[0]));
render(tripBoard, createDaysListTemplate());
const tripDaysList = document.querySelector(`.trip-days`);
render(tripDaysList, createDaysItemTemplate(dataPoints.slice(1)));
