export const City = {
  names: [`Amsterdam`, `Geneva`, `Chamonix`, `Moscow`, `Saint Petersburg`],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    `Sed tempus urna et pharetra pharetra.Mattis enim ut tellus elementum sagittis vitae.`,
    `Pretium quam vulputate dignissim suspendisse in est ante, at quis risus sed vulputate odio ut enim.`,
    `Sem integer vitae justo eget magna fermentum, eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim.`,
    `Quisque non tellus orci ac auctor augue mauris augue, mollis nunc sed id semper risus.`,
  ],
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const generateCities = () => {

  const getRandomCityPictures = () => {
    const pictures = [];
    for (let i = 0; i < getRandomIntegerNumber(3, 6); i++) {
      pictures.push({
        src: `http://picsum.photos/248/152?r=${getRandomIntegerNumber(1, 10000)}`,
        description: `Love Frontend Chat and Artur <3`,
      });
    }
    return pictures;
  };

  const getRandomCityDescription = () => {
    const description = new Set(); // только уникальные значения
    for (let i = 0; i < getRandomIntegerNumber(1, 5); i++) {
      description.add(City.description[getRandomIntegerNumber(1, City.description.length)]);
    }
    return Array.from(description).join(` `); // Переводим в array, что бы использовать .join()
  };

  return City.names.reduce((acc, city) => {
    acc[city] = {
      description: getRandomCityDescription(),
      pictures: getRandomCityPictures(),
    };
    return acc;
  }, {});
};


// const OfferType = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

// const Offer = {
//   "type": `taxi`,
//   "offers": [
//     {
//       "title": `Upgrade to a business class`,
//       "price": 120
//     },
//     {
//       "title": `Choose the radio station`, "price": 60
//     }
//   ]
// };
// const Destination = {
//   description: `Chamonix, is a beautiful city, a true asian pearl, with crowded streets.`,
//   name: `Chamonix`,
//   pictures: [
//     {
//       src: `http://picsum.photos/300/200?r=0.0762563005163317`,
//       description: `Chamonix parliament building`
//     },
//     {
//       src: `http://picsum.photos/300/200?r=0.0762563005163317`,
//       description: `Chamonix parliament building`
//     },
//   ],
// };

// export const Cities = {
//   'Amsterdam': {
//     description: `Chamonix, is a beautiful city, a true asian pearl, with crowded streets.`,
//     pictures: [
//       {
//         src: `http://picsum.photos/300/200?r=0.0762563005163317`,
//         description: `Chamonix parliament building`
//       },
//       {
//         src: `http://picsum.photos/300/200?r=0.0762563005163317`,
//         description: `Chamonix parliament building`
//       },
//     ],
//   },
//   'Moscow': {
//     description: `Chamonix, is a beautiful city, a true asian pearl, with crowded streets.`,
//     pictures: [
//       {
//         src: `http://picsum.photos/300/200?r=0.0762563005163317`,
//         description: `Chamonix parliament building`
//       },
//       {
//         src: `http://picsum.photos/300/200?r=0.0762563005163317`,
//         description: `Chamonix parliament building`
//       },
//     ],
//   },
//   'Minsk': {
//     description: `Chamonix, is a beautiful city, a true asian pearl, with crowded streets.`,
//     pictures: [
//       {
//         src: `http://picsum.photos/300/200?r=0.0762563005163317`,
//         description: `Chamonix parliament building`
//       },
//       {
//         src: `http://picsum.photos/300/200?r=0.0762563005163317`,
//         description: `Chamonix parliament building`
//       },
//     ],
//   },
// };


// const Destination = {
//   description: `Chamonix, is a beautiful city, a true asian pearl, with crowded streets.`,
//   name: `Chamonix`,
//   pictures: [
//     {
//       src: `http://picsum.photos/300/200?r=0.0762563005163317`,
//       description: `Chamonix parliament building`
//     },
//     {
//       src: `http://picsum.photos/300/200?r=0.0762563005163317`,
//       description: `Chamonix parliament building`
//     },
//   ],
// };

// const Offer = {
//   "type": `taxi`,
//   "offers": [
//     {
//       "title": `Upgrade to a business class`,
//       "price": 120
//     },
//     {
//       "title": `Choose the radio station`, "price": 60
//     }
//   ]
// };

// const OfferType = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

// const Point = {
//   "base_price": 1100,
//   "date_from": `2019-07-10T22:55:56.845Z`,
//   "date_to": `2019-07-11T11:22:13.375Z`,
//   "destination": $Destination$,
//   "id": `0`,
//   "is_favorite": false,
//   "type": `bus`,
//   "offers": [
//     {
//       "title": `Choose meal`, "price": 180
//     },
//     {
//       "title": `Upgrade to comfort class`, "price": 50
//     },
//   ],
// };

// const PointType = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

// const localPoint = {
//   basePrice: 222,
//   dateFrom: `2019-07-10T22:55:56.845Z`,
//   dateTo: `2019-07-11T11:22:13.375Z`,
//   destination: $Destination$,
//   isFavorite: false,
//   type: `taxi`,
//   offers: [
//     {
//       title: `Choose meal`,
//       price: 180
//     },
//     {
//       title: `Upgrade to comfort class`,
//       price: 50
//     }
//   ],
// };
