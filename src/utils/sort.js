import {SortType} from "../const.js";

export const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];

  switch (sortType) {
    case SortType.EVENT:
      sortedPoints = points.slice().sort((a, b) => a.date.checkIn - b.date.checkIn);
      break;
    case SortType.TIME:
      sortedPoints = points.slice().sort((a, b) => (b.date.checkOut - b.date.checkIn) - (a.date.checkOut - a.date.checkIn));
      break;
    case SortType.PRICE:
      sortedPoints = points.slice().sort((a, b) => b.price - a.price);
      break;
  }

  return sortedPoints;
};
