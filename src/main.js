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
import {createPointTemplate} from "./view/point.js";


const POINTS_COUNT = 3;


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
render(tripBoard, createPointEditTemplate());
render(tripBoard, createDaysListTemplate());
const tripDaysList = document.querySelector(`.trip-days`);
render(tripDaysList, createDaysItemTemplate());
const tripPointsList = document.querySelector(`.trip-events__list`);

for (let i = 0; i < POINTS_COUNT; i++) {
  render(tripPointsList, createPointTemplate());
}

// придумать структуру данных для компонентов так, что бы данные были отделены от  шаблона

// 1. Точка маршрута, объект с полями:
//  - Тип точки маршрута (Набор лежит в ТЗ)
//  - Пункт назначения (Рандомный город)
//  - Доп опции (0 -5 штук) — отдельная структура данных (с типом, названием и ценой)
//  - Информация о месте назначения:
//    - Описание (1 - 5 предложений)
//    — Фотографии (1 — 5 штук) заглушка http://picsum.photos/248/152?r=${Math.random()}
//  - Остальные данные ограничьте самостоятельно (прочесть ТЗ)

// 2. Написать функцию, которая будет возвращать готовые объекты по структуре из пункта
// 3. Переписать f по созданию маршрута, что бы она на вход принимала данные — объект определенной структуры
// 4. Аналогичным образом для формы создания маршрута
// 5. Разработать структуры для для остальных компонентов и вычислить для них данные на основе моков
// 6. Для оставшихся компонентов, так же переписать функцию по созданию шаблона
// 7. Переписать код в main.js для работы с моковыми данными. 1 - редактирование, остальные - точки маршрута
// 8. Распределить точки маршрута согласно дате.
