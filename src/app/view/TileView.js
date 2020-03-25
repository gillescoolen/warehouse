import View from './View';

export default class TileView extends View {
  #tile;

  constructor(tile) {
    super();

    this.#tile = this.getElement(`#${tile}`);
  }

  bindAddProduct(handler) {
    // Change event to drag event.
    this.#tile.addEventListener('click', event => {
      handler(event);
    });
  }
}
