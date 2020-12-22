import Abstract from "./abstract.js";

const createHeaderTemplate = () => {
  return (`
    <header class="page-header">
      <div class="page-body__container  page-header__container">
        <img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo">

      </div>
    </header>
  `);
};

export default class Header extends Abstract {
  getTemplate() {
    return createHeaderTemplate();
  }
}
