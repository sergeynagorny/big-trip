import FilterView from "../view/filter.js";
import {FilterType} from "../const.js";
import {render, replace} from "../utils/render.js";
import {getPointsByFilter} from "../utils/filter.js";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterView = null;

    this._onDataChange = this._onDataChange.bind(this); // ???
    this._onFilterChange = this._onFilterChange.bind(this); // ???

    this._pointsModel.setDataChangeHandler(this._onDataChange); // ???
  }

  render() {
    const container = this._container;
    const allPoints = this._pointsModel.getPointsAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getPointsByFilter(allPoints, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterView;

    this._filterView = new FilterView(filters); // ???
    this._filterView.setFilterChangeHandler(this._onFilterChange); // просто сообщает контроллеру, какой пункт выбран

    if (oldComponent) {
      replace(this._filterView, oldComponent);
    } else {
      render(container, this._filterView);
    }
  }

  setActiveFilterType(filterType) {
    this._activeFilterType = filterType;
    this._pointsModel.setFilter(this._activeFilterType);
    this.render();
  }

  _onFilterChange(filterType) { // просто сообщает контроллеру, какой пункт выбран
    this._activeFilterType = filterType;
    this._pointsModel.setFilter(this._activeFilterType);
  }

  _onDataChange() { // что делать с контроллером, если данные обновятс
    this.render();
  }
}
