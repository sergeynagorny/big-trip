import Abstract from "./abstract.js";


const createControlsMenuTemplate = () => {
  return (`
    <div class="trip-main">
      <section class="trip-main__trip-info trip-info">
        <div class="trip-info__main trip-info__route-and-date"></div>
      </section>
      <div class="trip-main__trip-controls  trip-controls">
        <h2 class="visually-hidden">Switch trip view</h2>
        <nav class="trip-controls__trip-tabs  trip-tabs">
          <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
          <a class="trip-tabs__btn" href="#">Stats</a>
        </nav>
      </div>
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    </div>
  `);
};


export default class ControlsMenu extends Abstract {
  getTemplate() {
    return createControlsMenuTemplate();
  }
}
