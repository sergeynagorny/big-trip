import TripInfoView from "./view/trip-info.js";
import TripRouteView from "./view/trip-route.js";
import TripDatesView from "./view/trip-dates.js";
import TripCostView from "./view/trip-cost.js";
import ControlsMenuView from "./view/controls-menu.js";
import ControlsFilterView from "./view/controls-filter.js";
import SortView from "./view/sort.js";
import TripListView from "./view/trip-list.js";
import NoPointsView from "./view/no-points.js";
import PointView from "./view/point.js";
import PointEditView from "./view/point-edit.js";

import {generatePoints} from "./model/point.js";
import {render, replace} from "./utils/render.js";


const POINTS_COUNT = 22;
const dataPoints = generatePoints(POINTS_COUNT);


const tripInfoContainer = document.querySelector(`.trip-main`);
render(tripInfoContainer, new TripInfoView(), `afterbegin`);

const tripInfoPriceContainer = document.querySelector(`.trip-main__trip-info`);
render(tripInfoPriceContainer, new TripCostView(dataPoints));

const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsContainer, new ControlsMenuView());
render(tripControlsContainer, new ControlsFilterView());


const renderPoint = (tripList, point) => {

  const replacePointToEdit = () => {
    replace(pointEditView, pointView);
  };

  const replaceEditToPoint = () => {
    replace(pointView, pointEditView);
  };


  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const pointView = new PointView(point);
  pointView.setEditButtonClickHandler(() => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const pointEditView = new PointEditView(point);
  pointEditView.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripList, pointView);
};

const renderPointBoard = (tripBoard, points) => {

  if (points.length === 0) {
    render(tripBoard, new NoPointsView());
    return;
  }

  const tripInfoMetadataContainer = document.querySelector(`.trip-info__main`);
  render(tripInfoMetadataContainer, new TripRouteView(dataPoints));
  render(tripInfoMetadataContainer, new TripDatesView(dataPoints));

  render(tripBoard, new SortView());
  render(tripBoard, new TripListView());
  const tripList = document.querySelector(`.trip-events__list`);

  points.forEach((point) => {
    renderPoint(tripList, point);
  });
};

const tripBoard = document.querySelector(`.trip-events`);
renderPointBoard(tripBoard, dataPoints);

