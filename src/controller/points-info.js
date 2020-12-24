import PointsInfoView from "../view/points-info.js";

import {remove, render, replace} from "../utils/render.js";


export default class PointsInfoController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._pointsInfoView = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }


  render() {
    const oldPointsInfoView = this._pointsInfoView;
    const points = this._pointsModel.getPointsAll();

    this._pointsInfoView = new PointsInfoView(points);

    if (oldPointsInfoView) {
      replace(this._pointsInfoView, oldPointsInfoView);
      remove(oldPointsInfoView);
    } else {
      render(this._container, this._pointsInfoView, `afterbegin`);
    }
  }

  _onDataChange() {
    this.render();
  }
}
