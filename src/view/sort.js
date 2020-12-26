import AbstractSmart from "./abstract-smart.js";

export const SortType = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const createSortTemplate = () => {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.EVENT}" checked>
        <label class="trip-sort__btn" for="${SortType.EVENT}">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.TIME}">
        <label class="trip-sort__btn" for="${SortType.TIME}">Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.PRICE}">
        <label class="trip-sort__btn" for="${SortType.PRICE}">Price</label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>
  `);
};


export default class Sort extends AbstractSmart {
  constructor() {
    super();

    this._currenSortType = SortType.EVENT;

    this._setSortTypeChangeHandler = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortType(sortType) {
    this._currenSortType = sortType;
    this.rerender();
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._setSortTypeChangeHandler);
  }

  setSortTypeChangeHandler(handler) {
    this._setSortTypeChangeHandler = handler;

    const inputs = this.getElement().querySelectorAll(`.trip-sort__input`);

    inputs.forEach((input) => {
      input.addEventListener(`click`, (evt) => {
        const sortType = evt.target.value;

        if (this._currenSortType !== sortType) {
          this._currenSortType = sortType;
          handler(this._currenSortType);
        }
      });
    });
  }
}
