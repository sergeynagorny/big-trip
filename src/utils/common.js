export const createDestinationMap = (data) => {
  return data.map((it) => {
    return [it.name, it];
  });
};

export const createOffersMap = (data) => {
  return data.map((it) => {
    return [it.title, it.price];
  });
};

export const createTypesMap = (data) => {
  return data.map((it) => {
    return [it.type, new Map(createOffersMap(it.offers))];
  });
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
