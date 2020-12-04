import TripInfoView from "./view/trip-info.js";
import TripRouteView from "./view/trip-route.js";
import TripDatesView from "./view/trip-dates.js";
import TripCostView from "./view/trip-cost.js";
import ControlsMenuView from "./view/controls-menu.js";
import ControlsFilterView from "./view/controls-filter.js";
import SortView from "./view/sort.js";
import TripListView from "./view/trip-list.js";
import NoPointsView from "./view/no-points.js";
import DaysListView from "./view/days-list.js";
import PointView from "./view/point.js";
import PointEditView from "./view/point-edit.js";

import {generatePoints} from "./model/point.js";
import {render} from "./utils.js";


const POINTS_COUNT = 22;
const dataPoints = generatePoints(POINTS_COUNT);


const tripInfoContainer = document.querySelector(`.trip-main`);
render(tripInfoContainer, new TripInfoView().getElement(), `afterbegin`);

const tripInfoPriceContainer = document.querySelector(`.trip-main__trip-info`);
render(tripInfoPriceContainer, new TripCostView(dataPoints).getElement());

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsContainer, new ControlsMenuView().getElement());
render(tripControlsContainer, new ControlsFilterView().getElement());


const renderPoint = (tripList, point) => {

  const replacePointToEdit = () => {
    tripList.replaceChild(pointEditView.getElement(), pointView.getElement());
  };

  const replaceEditToPoint = () => {
    tripList.replaceChild(pointView.getElement(), pointEditView.getElement());
  };


  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };


  const pointView = new PointView(point);
  const editButton = pointView.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const pointEditView = new PointEditView(point);
  const editForm = pointEditView.getElement();
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });


  render(tripList, pointView.getElement());
};

const renderPointBoard = (tripBoard, points) => {

  if (points.length === 0) {
    render(tripBoard, new NoPointsView().getElement());
    return;
  }

  const tripInfoMetadataContainer = document.querySelector(`.trip-info__main`);
  render(tripInfoMetadataContainer, new TripRouteView(dataPoints).getElement());
  render(tripInfoMetadataContainer, new TripDatesView(dataPoints).getElement());

  render(tripBoard, new SortView().getElement());
  render(tripBoard, new TripListView().getElement());
  const tripList = document.querySelector(`.trip-events__list`);

  points.forEach((point) => {
    renderPoint(tripList, point);
  });
};

const tripBoard = document.querySelector(`.trip-events`);
renderPointBoard(tripBoard, dataPoints);

// 1. Абстрактный класс
//    Выделить общие части компонентов в абстрактный класс
//    1.1 Изучить структуру
//    1.2 Описать абстрактный класс. +
//        Он точно такой же как и все остальные, только создавать компонент на прямую из него нельзя.
//    1.3 Объявить в нем общие свойства и методы, пока что пустые +
//    1.4 Обязательно реализовать метод гетТемплайт +
//    1.5 Унаследовать все компоненты от абстрактного класса
//    1.6 Перенести реализацию общих методов из потомков в родителя
//    1.7 Запустить проект
