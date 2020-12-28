import Abstract from "./abstract.js";

const ACTIVE_CLASS = `trip-tabs__btn--active`;

const createTabsMarkup = (name, isChecked) => {
  const activeClass = isChecked ? ACTIVE_CLASS : ``;

  return (`
    <a class="trip-tabs__btn ${activeClass}" href="#">${name}</a>
  `);
};

const createTabsMenuTemplate = (tabs) => {
  const tabsMarkup = tabs.map((it) => createTabsMarkup(it.name, it.checked)).join(`\n`);

  return (`
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${tabsMarkup}
    </nav>
  `);
};


export default class TabsMenu extends Abstract {
  constructor(tabs) {
    super();

    this._tabs = tabs;
  }

  getTemplate() {
    return createTabsMenuTemplate(this._tabs);
  }

  setTabsMenuChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      handler(evt.target.textContent);
    });
  }
}
