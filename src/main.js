import PointsBoardView from "./view/points-board.js";
import PointsBoardController from "./controller/points-board.js";
import HeaderView from "./view/header.js";
import HeaderController from "./controller/header.js";
import PointsModel from "./model/points.js";
import {generatePoints} from "./mock/point.js";
import {render} from "./utils/render.js";

const body = document.querySelector(`body`);
const boardContainer = document.querySelector(`.page-body__container`);

const POINTS_COUNT = 10;
const dataPoints = generatePoints(POINTS_COUNT);
const pointsModel = new PointsModel();
pointsModel.setPoints(dataPoints);


const headerView = new HeaderView();
const headerController = new HeaderController(headerView);
headerController.render(dataPoints);
render(body, headerView, `afterbegin`);

const pointsBoardView = new PointsBoardView();
render(boardContainer, pointsBoardView);
const pointsBoardController = new PointsBoardController(pointsBoardView, pointsModel);
pointsBoardController.render();
