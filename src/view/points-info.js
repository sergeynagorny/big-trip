import Abstract from "./abstract.js";

const calculateFullPrice = (points) => {
  return points.reduce((acc, item) => {
    const {price, offers} = item;
    return acc + price + Object.keys(offers).reduce((offersAcc, key) => offersAcc + offers[key].price, 0);
  }, 0);
};

const getPointsRoute = (points) => {
  const orderRoute = points.reduce((acc, point) => {
    const pointName = point.destination.name;
    if (acc.length === 0 || acc[acc.length - 1] !== pointName) {
      acc.push(pointName);
    }
    return acc;
  }, []);

  if (orderRoute.length <= 3) {
    return orderRoute.map((item) => item).join(` — `);
  } else {
    return orderRoute[0] + ` — ... — ` + orderRoute[orderRoute.length - 1];
  }
};

const getPointsDates = (points) => {
  if (points[0] === undefined) {
    return ``;
  }

  const firstDate = points[0].date.checkIn;
  const lastDate = points[points.length - 1].date.checkOut;

  const formatFirstDate = `${firstDate.getUTCMonth()} ${firstDate.getUTCDate()}`;
  const formatLastDate = firstDate.getUTCMonth() === lastDate.getUTCMonth() ? `${lastDate.getUTCDate()}` : `${lastDate.getUTCMonth()} ${lastDate.getUTCDate()}`;


  return `${formatFirstDate} — ${formatLastDate}`;
};

const createPointsInfoTemplate = (points) => {
  const pointsfullPrice = calculateFullPrice(points);
  const pointsRoute = getPointsRoute(points);
  const pointsDates = getPointsDates(points);

  return (`
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${pointsRoute}</h1>
        <p class="trip-info__dates">${pointsDates}</p>
      </div>
      <p class="trip-info__cost">Total: &euro;&nbsp;
        <span class="trip-info__cost-value">${pointsfullPrice}</span>
      </p>
    </section>
  `);
};

export default class pointsInfo extends Abstract {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return createPointsInfoTemplate(this._points);
  }
}
