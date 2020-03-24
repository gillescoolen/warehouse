import View from './View';

export default class TileView extends View {
  #tile;

  constructor() {
    super();
  }

  bindAddProduct(tile, handler) {
    this.#tile = this.getElement(`#${tile}`);

    // Change event to drag event.
    this.#tile.addEventListener('click', event => {
      handler(event);
    });
  }
}
