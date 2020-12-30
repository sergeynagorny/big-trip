import API from "./api.js";
import PointsBoardView from "./view/points-board.js";
import PointsBoardController from "./controller/points-board.js";
import HeaderView from "./view/header.js";
import HeaderController from "./controller/header.js";
import PointsModel from "./model/points.js";
import {render} from "./utils/render.js";

const AUTHORIZATION = `Basic dXNlckBYXNzd22yZAo=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const body = document.querySelector(`body`);
const boardContainer = document.querySelector(`.page-body__container`);

const api = new API(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();

const pointsBoardView = new PointsBoardView();
render(boardContainer, pointsBoardView);
const pointsBoardController = new PointsBoardController(pointsBoardView, pointsModel, api);

const headerView = new HeaderView();
const headerController = new HeaderController(headerView, pointsBoardController, pointsModel);
headerController.render();
render(body, headerView, `afterbegin`);


Promise.all([
  api.getPoints(),
  api.getOffers(),
  api.getDestinations(),
]).then(([points, offers, destinations]) => {
  pointsModel.setPoints(points);
  pointsModel.setOffers(offers);
  pointsModel.setDestinations(destinations);
  pointsBoardController.render();
});
