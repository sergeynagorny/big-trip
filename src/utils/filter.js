import {FilterType} from "../const.js";

export const getPointsByFilter = (points, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:
      return points.filter((it) => it.date.checkOut > nowDate);
    case FilterType.PAST:
      return points.filter((it) => it.date.checkOut < nowDate);

  }

  return points;
};
