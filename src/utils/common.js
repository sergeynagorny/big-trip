import {TypesGroup, prepositionsMap} from "../const.js";

export const formatTypesGroup = (type) => {
  const typeGroup = getKeyByValue(TypesGroup, type);
  return prepositionsMap[typeGroup];
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key].includes(value));
};

export const createDestinationMap = (data) => {
  return data.reduce((acc, item) => {
    const itemKey = item.name.toLowerCase().replace(/ /g, `-`);

    acc[itemKey] = {
      name: item.name,
      description: item.description,
      pictures: item.pictures,
    };
    return acc;
  }, {});
};

export const createOffersMap = (data) => {
  return data.reduce((acc, item) => {
    const itemKey = item.title.toLowerCase().replace(/ /g, `-`);

    acc[itemKey] = {
      title: item.title,
      price: item.price,
    };
    return acc;
  }, {});
};

export const createTypeOffersMap = (data) => {
  return data.reduce((acc, item) => {
    acc[item.type] = {
      group: getKeyByValue(TypesGroup, item.type),
      offers: createOffersMap(item.offers),
    };
    return acc;
  }, {});
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};
