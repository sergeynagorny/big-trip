import Abstract from "./abstract.js";
import {getDate, getDayMonth} from "../utils/datetime.js";


const createPointsListTemplate = (date, index) => {
  let dayInfo = ``;

  if (date && index) {
    const dayDate = getDate(new Date(date));
    const dayMonth = getDayMonth(new Date(date));

    dayInfo = `<span class="day__counter">${index}</span>
              <time class="day__date" datetime="${dayDate}">${dayMonth}</time>`;
  }

  return (
    `<li class="trip-days__item day">
      <div class="day__info">${dayInfo}</div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};


export default class PointsList extends Abstract {
  constructor(date, index) {
    super();

    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createPointsListTemplate(this._date, this._index);
  }

  getPointsContainer() {
    return this.getElement().querySelector(`.trip-events__list`);
  }
}
