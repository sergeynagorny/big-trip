import Abstract from "./abstract.js";

const createHeaderTemplate = () => {
  return (`
    <header class="page-header">
      <div class="page-body__container  page-header__container">
        <img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo">
        <div class="trip-main">
          <section class="trip-main__trip-info trip-info">
            <div class="trip-info__main trip-info__route-and-date"></div>
          </section>
          <div class="trip-main__trip-controls  trip-controls"></div>
          <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
        </div>
      </div>
    </header>
  `);
};

export default class Header extends Abstract {
  getTemplate() {
    return createHeaderTemplate();
  }
}
