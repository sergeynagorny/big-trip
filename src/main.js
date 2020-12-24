import PointsBoardView from "./view/points-board.js";
import PointsBoardController from "./controller/points-board.js";
import HeaderView from "./view/header.js";
import HeaderController from "./controller/header.js";
import PointsModel from "./model/points.js";
import {generatePoints} from "./mock/point.js";
import {CITY} from "./mock/cities.js";
import {OFFERS} from "./mock/types.js";
import {render} from "./utils/render.js";


const body = document.querySelector(`body`);
const boardContainer = document.querySelector(`.page-body__container`);

const POINTS_COUNT = 10;
const dataPoints = generatePoints(POINTS_COUNT);


const pointsModel = new PointsModel();
pointsModel.setPoints(dataPoints);
pointsModel.setDestinations(CITY);
pointsModel.setOffers(OFFERS);


const headerView = new HeaderView();
const headerController = new HeaderController(headerView, pointsModel);
headerController.render();
render(body, headerView, `afterbegin`);

const pointsBoardView = new PointsBoardView();
render(boardContainer, pointsBoardView);
const pointsBoardController = new PointsBoardController(pointsBoardView, pointsModel);
pointsBoardController.render();


// ============================== ХУЕТА

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
// const URL_TASKMANAGER = `https://11.ecmascript.pages.academy/task-manager/tasks`;
// const URL_CINEMADDICT = `https://11.ecmascript.pages.academy/cinemaddict/movies`;
// const URL_BIGTRIP_POINTS = `https://13.ecmascript.pages.academy/big-trip/points`;
// const URL_BIGTRIP_DESTINATIONS = `https://13.ecmascript.pages.academy/big-trip/destinations`;
// const URL_BIGTRIP_OFFERS = `https://11.ecmascript.pages.academy/big-trip/offers`;

import API from "./api.js";
// const api = new API(URL_BIGTRIP_OFFERS, AUTHORIZATION);


// api.getTasks().then((items) => console.log(items));
