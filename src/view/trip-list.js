import Abstract from "./abstract.js";

const createTripListTemplate = () => {
  return (`
    <ul class="trip-days"></ul>
  `);
};

export default class TripList extends Abstract {
  getTemplate() {
    return createTripListTemplate();
  }

  clear() {
    this.getElement().innerHTML = ``;
  }
}
