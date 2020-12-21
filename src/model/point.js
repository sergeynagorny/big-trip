import {getRandomArrayItem, getRandomIntegerNumber} from '../utils/common.js';
import {CITY} from "./cities.js";
import {TYPE} from "./types.js";

const getRandomDate = () => {
  const dateStart = new Date();

  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffDayValue = sign * getRandomIntegerNumber(0, 3);
  const randomHourse = getRandomIntegerNumber(0, 24);
  const randomMinutes = getRandomIntegerNumber(1, 24) * 5;

  dateStart.setDate(dateStart.getDate() + diffDayValue);
  dateStart.setHours(randomHourse);
  dateStart.setMinutes(randomMinutes);

  const dateEnd = new Date(dateStart);
  dateEnd.setMinutes(dateStart.getMinutes() + randomMinutes);

  return {
    start: dateStart,
    end: dateEnd
  };
};

const getRandomOffers = (offers) => {
  return offers.filter(function () {
    return getRandomIntegerNumber(0, 2);
  });
};

const generateOffers = (array) => {
  return array.map((it) => {
    return Object.assign({}, it, {isActive: Boolean(getRandomIntegerNumber(0, 2))});
  });
};


export const generatePoint = () => {
  const destination = getRandomArrayItem(Object.keys(CITY));
  const type = getRandomArrayItem(Object.keys(TYPE));

  return {
    type,
    destination,
    price: getRandomIntegerNumber(1, 50) * 5,
    destinationInfo: CITY[destination],
    energy: generateOffers(TYPE[type].offers),
    typeInfo: {
      offers: getRandomOffers(TYPE[type].offers),
    },
    isFavorite: Boolean(getRandomIntegerNumber(0, 2)),
    date: getRandomDate(),
  };
};

export const generatePoints = (count) => {
  return new Array(count).fill(``).map(generatePoint).sort((left, right) => left.date.start - right.date.start);
};
