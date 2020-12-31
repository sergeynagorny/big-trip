import Abstract from "./abstract.js";

const createPreloaderTemplate = () => {
  return (`
    <p class="trip-events__msg">Loading...</p>
  `);
};

export default class Preloader extends Abstract {
  getTemplate() {
    return createPreloaderTemplate();
  }
}
