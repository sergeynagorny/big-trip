import PointsInfoController from "../controller/points-info.js";
import FilterController from "../controller/filter.js";
import {render} from "../utils/render.js";


export default class Header {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._filterController = null;
    this._pointsInfoController = null;
  }

  render() {
    const container = this._container.getElement();

    const containerPointsInfo = container.querySelector(`.trip-main`);
    this._pointsInfoController = new PointsInfoController(containerPointsInfo, this._pointsModel);
    this._pointsInfoController.render();

    const containerTripControls = container.querySelector(`.trip-controls`);
    this._filterController = new FilterController(containerTripControls, this._pointsModel);
    this._filterController.render();
  }
}
