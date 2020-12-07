import Abstract from "./abstract.js";

const createPointsBoardTemplate = () => {
  return (`
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>
  `);
};

export default class Header extends Abstract {
  getTemplate() {
    return createPointsBoardTemplate();
  }
}
