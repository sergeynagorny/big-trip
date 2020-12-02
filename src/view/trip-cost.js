import {createElement} from "../utils.js";


const calculateFullPrice = (points) => {
  return points.reduce((pointsAcc, pointItem) => {
    const {price: pointPrice, typeInfo: {offers}} = pointItem;

    const offersPrice = offers.reduce((offersAcc, offerItem) => {
      const {price: offerPrice} = offerItem;
      return offersAcc + offerPrice;
    }, 0);

    return pointsAcc + pointPrice + offersPrice;
  }, 0);
};

const createTripCostTemplate = (points) => {
  const fullCost = calculateFullPrice(points);

  return (`
    <p class="trip-info__cost">Total: &euro;&nbsp;
      <span class="trip-info__cost-value">${fullCost}</span>
    </p>
  `);
};


export default class TripCost {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
