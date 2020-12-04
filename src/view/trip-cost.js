import Abstract from "./abstract.js";


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


export default class TripCost extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}
