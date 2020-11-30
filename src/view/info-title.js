const getPointssName = (data) => {
  return data.map((item) => item.destination)
    .filter((item, index) => (index === 0 || data[index - 1].destination !== data[index].destination) ? true : false)
    .join(` — `);
};

export const createInfoTitleTemplate = (points) => {
  return `<h1 class="trip-info__title">${getPointssName(points)}</h1>`;
};
