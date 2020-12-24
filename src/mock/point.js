import {getRandomArrayItem, getRandomIntegerNumber, createDestinationMap, createTypeOffersMap} from '../utils/common.js';
import {CITY} from "./cities.js";
import {OFFERS} from "./types.js";


const destinationMap = createDestinationMap(CITY);
const typeOffersMap = createTypeOffersMap(OFFERS);


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
    checkIn: dateStart,
    checkOut: dateEnd
  };
};

const generateActiveOffers = (data) => {
  return Object.fromEntries(Object.entries(data).filter(() => {
    return Boolean(getRandomIntegerNumber(0, 2));
  }));
};


export const generatePoint = () => {
  const destination = getRandomArrayItem(Object.keys(destinationMap));
  const type = getRandomArrayItem(Object.keys(typeOffersMap));

  return {
    id: String(new Date() + Math.random()),
    type,
    destination: {
      name: destinationMap[destination].name,
      description: destinationMap[destination].description,
      pictures: destinationMap[destination].pictures,
    },
    date: getRandomDate(),
    price: getRandomIntegerNumber(1, 50) * 5,
    offers: generateActiveOffers(typeOffersMap[type].offers),
    isFavorite: Boolean(getRandomIntegerNumber(0, 2)),
  };
};


export const generatePoints = (count) => {
  return new Array(count).fill(``).map(generatePoint).sort((left, right) => left.date.checkIn - right.date.checkIn);
};
