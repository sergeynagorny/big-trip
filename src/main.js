import {createTripInfoTemplate} from "./view/trip-info.js";
import {createInfoTitleTemplate} from "./view/info-title.js";
import {createInfoDatesTemplate} from "./view/info-dates.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createControlsMenuTemplate} from "./view/controls-menu.js";
import {createControlsFilterTemplate} from "./view/controls-filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createDaysListTemplate} from "./view/days-list.js";
import {createDaysItemTemplate} from "./view/days-item.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createEventTemplate} from "./view/event.js";

const EVENTS_COUNT = 3;


const render = (container, template, place = `beforeEnd`) => {
  container.insertAdjacentHTML(place, template);
};

// HEADER CONTAINER
const tripInfoContainer = document.querySelector(`.trip-main`);
render(tripInfoContainer, createTripInfoTemplate(), `afterBegin`);

const tripInfoMetadataContainer = document.querySelector(`.trip-info__main`);
render(tripInfoMetadataContainer, createInfoTitleTemplate());
render(tripInfoMetadataContainer, createInfoDatesTemplate());

const tripInfoPriceContainer = document.querySelector(`.trip-main__trip-info`);
render(tripInfoPriceContainer, createTripCostTemplate());

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsContainer.querySelector(`h2:nth-of-type(1)`), createControlsMenuTemplate(), `afterEnd`);
render(tripControlsContainer.querySelector(`h2:nth-of-type(2)`), createControlsFilterTemplate(), `afterEnd`);

// BOARD CONTAINER
const tripBoard = document.querySelector(`.trip-events`);
render(tripBoard, createSortTemplate());
render(tripBoard, createEventEditTemplate());
render(tripBoard, createDaysListTemplate());
const tripDaysList = document.querySelector(`.trip-days`);
render(tripDaysList, createDaysItemTemplate());
const tripEventsList = document.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(tripEventsList, createEventTemplate());
}
