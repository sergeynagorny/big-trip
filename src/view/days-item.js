import {createPointTemplate} from "./point";
import dayjs from 'dayjs';

const getEventDateList = (data) => {
  const array = data.map((item) => {
    return dayjs(item.date.start).format(`MMM DD`);
  });
  return Array.from(new Set(array));
};

export const createDaysItemTemplate = (points) => {

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
