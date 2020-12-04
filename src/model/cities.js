import {getRandomIntegerNumber} from '../utils/common.js';


export const City = {
  names: [`Amsterdam`, `Geneva`, `Chamonix`],
  descriptions: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    `Sed tempus urna et pharetra pharetra.Mattis enim ut tellus elementum sagittis vitae.`,
    `Pretium quam vulputate dignissim suspendisse in est ante, at quis risus sed vulputate odio ut enim.`,
    `Sem integer vitae justo eget magna fermentum, eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim.`,
    `Quisque non tellus orci ac auctor augue mauris augue, mollis nunc sed id semper risus.`,
  ],
};


export const getRandomCityPictures = () => {
  const pictures = [];
  for (let i = 0; i < getRandomIntegerNumber(3, 6); i++) {
    pictures.push({
      src: `http://picsum.photos/248/152?r=${getRandomIntegerNumber(1, 10000)}`,
      description: `Love Frontend Chat and Artur <3`,
    });
  }
  return pictures;
};

export const getRandomCityDescription = () => {
  const description = new Set();
  for (let i = 0; i < getRandomIntegerNumber(1, 5); i++) {
    description.add(City.descriptions[getRandomIntegerNumber(0, City.descriptions.length)]);
  }
  return Array.from(description).join(` `);
};

export const generateCities = () => {
  return City.names.reduce((acc, city) => {
    acc[city] = {
      description: getRandomCityDescription(),
      pictures: getRandomCityPictures(),
    };
    return acc;
  }, {});
};
