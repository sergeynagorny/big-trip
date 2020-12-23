import {getRandomIntegerNumber, getRandomArrayItem} from '../utils/common.js';


export const Types = {
  transfer: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  activity: [`check-in`, `sightseeing`, `restaurant`],
};

const OfferTitles = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
  `Travel by train`,
  `Rent a car`,
  `Add breakfast`,
  `Book tickets`,
  `Lunch in city`,
  `Order Uber`,
];


const generateTypeOffers = () => {
  const offers = [];

  for (let i = 0; i < getRandomIntegerNumber(1, 5); i++) {
    offers.push({
      title: getRandomArrayItem(OfferTitles),
      price: getRandomIntegerNumber(1, 30) * 5,
    });
  }

  return offers;
};

export const generatePointTypes = () => {
  const someobj = [];

  Object.keys(Types).forEach((key) => {
    Types[key].reduce((acc, city) => {
      acc[city] = {
        type: key,
        offers: generateTypeOffers(),
      };
      return acc;
    }, someobj);
  });

  return someobj;
};

export const TYPE = generatePointTypes();

const generateOffers = () => {
  const typesName = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

  return typesName.map((it) => {
    return {
      type: it,
      offers: generateTypeOffers(),
    };
  });
};

export const OFFERS = generateOffers();
