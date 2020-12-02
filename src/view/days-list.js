import {createPointTemplate} from "./point";
import {createElement} from "../utils.js";
import dayjs from 'dayjs';


// const func = (data) => {
//   const secondObj = {};

//   data.forEach((point) => {
//     const pointType = point.type;

//     if (secondObj[pointType]) {
//       secondObj[pointType].push(point);
//     } else {
//       secondObj[pointType] = [point];
//     }
//   });

//   return secondObj;
// };

// console.log(func(dataPoints));

const getEventDateList = (data) => {
  const array = data.map((item) => {
    return dayjs(item.date.start).format(`MMM DD`);
  });
  return Array.from(new Set(array));
};

const createDaysItemTemplate = (points) => {
  const uniqueArray = getEventDateList(points);

  return uniqueArray.map((itemDate, index) => {
    const activePoints = points.filter((it) => {
      return itemDate === dayjs(it.date.start).format(`MMM DD`);
    });

    return (`
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${index + 1}</span>
          <time class="day__date" datetime="2019-03-18">${itemDate}</time>
        </div>
        <ul class="trip-events__list">
          ${activePoints.map((it) => createPointTemplate(it)).join(``)}
        </ul>
      </li>
    `);
  }).join(``);
};

const createDaysListTemplate = (points) => {
  return (`
    <ul class="trip-days">${createDaysItemTemplate(points)}</ul>
  `);
};


export default class DayList {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createDaysListTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
