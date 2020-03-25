import View from './View';

export default class RegionView extends View {
  #grid;
  #menu;

  constructor() {
    super();

    this.#grid = this.getElement('#grid');
    this.#menu = this.getMultipleElements('#menu div');
  }

  clearGrid = () => {
    while (this.#grid.firstChild) this.#grid.removeChild(this.#grid.firstChild);
  };

  renderGrid = tiles => {
    this.clearGrid();

    tiles.forEach(tile => {
      this.#grid.append(
        this.createElement('div', tile.name, [
          'tile',
          tile.hasHazard() ? 'hazard' : 'open'
        ])
      );
    });
  };

  bindRegionChange = handler => {
    this.#menu.forEach(child =>
      child.addEventListener('click', event => handler(child.id))
    );
  };
}
