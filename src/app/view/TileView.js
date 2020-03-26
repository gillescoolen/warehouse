import View from './View';

export default class TileView extends View {
  #tile;

  constructor(tile) {
    super();

    this.#tile = this.getElement(`#${tile}`);

    this.onDragOver();
  }

  onDragOver(handler) {
    this.#tile.addEventListener('dragover', event => event.preventDefault());
  }

  onDrop(handler) {
    this.#tile.addEventListener('drop', event => {
      handler(event);
    });
  }

  setOccupied = () => this.addClass(this.#tile, 'occupied');
}
