import Abstract from "./abstract.js";

const createFilterMarkup = (name, count, isChecked) => {
  const filterDisbaled = !count ? `disabled` : ``;

  return (`
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``} ${filterDisbaled}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>
  `);
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it) => createFilterMarkup(it.name, it.count, it.checked)).join(`\n`);

  return (`
    <div>
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filterMarkup}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  `);
};


export default class Filter extends Abstract {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelector(`.trip-filters`).addEventListener(`change`, (evt) => {
      const filterName = evt.target.value;
      handler(filterName);
    });
  }
}
