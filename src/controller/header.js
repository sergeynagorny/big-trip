import PointsInfoController from "../controller/points-info.js";
import FilterController from "../controller/filter.js";
import StatisticsView from "../view/statistics.js";
import TabsMenuView from "../view/tabs-menu.js";
import {FilterType, TabsItem} from "../const.js";
import {render, replace} from "../utils/render.js";
import {getKeyByValue} from "../utils/common.js";


export default class Header {
  constructor(container, pointsBoardController, pointsModel) {
    this._container = container;
    this._pointsBoardController = pointsBoardController;
    this._pointsModel = pointsModel;

    this._activeMenuTab = TabsItem.TABLE;

    this._tabsMenuView = null;
    this._statisticsView = null;
    this._filterController = null;
    this._pointsInfoController = null;

    this._onTabsMenuChange = this._onTabsMenuChange.bind(this);
  }

  render() {
    const container = this._container.getElement();

    const containerPointsInfo = container.querySelector(`.trip-main`);
    this._pointsInfoController = new PointsInfoController(containerPointsInfo, this._pointsModel);
    this._pointsInfoController.render();

    const containerTripControls = container.querySelector(`.trip-controls`);

    this._renderTabs(this._activeMenuTab);

    this._filterController = new FilterController(containerTripControls, this._pointsModel);
    this._filterController.render();

    this._statisticsView = new StatisticsView(this._pointsModel);
    const pageBodyElement = document.querySelector(`.page-body__container`);
    render(pageBodyElement, this._statisticsView);
    this._statisticsView.hide();

    this._container.setAddPointButtonClickHandler(() => {
      this._showTable();
      this._filterController.setActiveFilterType(FilterType.EVERYTHING);
      this._pointsBoardController.createPoint();
    });
  }

  _renderTabs(activeMenuTab) {
    this._activeMenuTab = activeMenuTab;

    const containerTripControls = this._container.getElement().querySelector(`.trip-controls`);
    const oldTabsMenuView = this._tabsMenuView;

    const tabs = Object.values(TabsItem).map((tabsItem) => {
      return {
        name: tabsItem,
        checked: tabsItem === this._activeMenuTab,
      };
    });

    this._tabsMenuView = new TabsMenuView(tabs);
    this._tabsMenuView.setTabsMenuChangeHandler(this._onTabsMenuChange);

    if (oldTabsMenuView) {
      replace(this._tabsMenuView, oldTabsMenuView);
    } else {
      render(containerTripControls, this._tabsMenuView);
    }
  }

  _onTabsMenuChange(cerrentMenuTab) {
    if (cerrentMenuTab === this._activeMenuTab) {
      return;
    }

    switch (cerrentMenuTab) {
      case TabsItem.TABLE:
        this._showTable();
        break;

      case TabsItem.STATS:
        this._showStats();
        break;
    }
  }

  _showTable() {
    this._pointsBoardController.show();
    this._statisticsView.hide();
    this._renderTabs(TabsItem.TABLE);
  }

  _showStats() {
    this._pointsBoardController.hide();
    this._statisticsView.show();
    this._renderTabs(TabsItem.STATS);
  }
}
