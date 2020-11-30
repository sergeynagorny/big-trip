const calculateFullPrice = (points) => {
  return points.reduce((pointsAcc, pointItem) => {
    return pointsAcc + pointItem.price + pointItem.typeInfo.offers.reduce((offersAcc, offerItem) => {
      return offersAcc + offerItem.price;
    }, 0);
  }, 0);
};

export const createTripCostTemplate = (points) => {
  return `<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateFullPrice(points)}</span></p>`;
};
