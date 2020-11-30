import dayjs from 'dayjs';

const getDate = (data) => {
  const start = data[0].date.start;
  const end = data[data.length - 1].date.end;

  const formatStart = dayjs(start).format(`MMM DD`);
  const formatEnd = dayjs(start).get(`month`) === dayjs(end).get(`month`) ? dayjs(end).format(`DD`) : dayjs(end).format(`MMM DD`);

  return [formatStart, formatEnd].join(` — `);
};


export const createInfoDatesTemplate = (points) => {
  return `<p class="trip-info__dates">${getDate(points)}</p>`;
};
