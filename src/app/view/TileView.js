import View from './View';

export default class TileView extends View {
  #tile;

  #modal;
  #tileTitle;
  #regionTitle;
  #productTitle;

  constructor(name) {
    super();
    this.#modal = this.getElement(`.modal`);
    this.#tile = this.getElement(`#${name}`);

    this.#tileTitle = this.getElement(`#tileTitle`);
    this.#regionTitle = this.getElement(`#regionTitle`);
    this.#productTitle = this.getElement(`#productTitle`);

    this.onDragOver();
  }

  /**
   * Prevents the default dragover action on our tile.
   */
  onDragOver = () =>
    this.#tile.addEventListener('dragover', event => event.preventDefault());

  /**
   * Binds our tile's drop event to the given handler.
   * @param {Function} handler The function we run whenever drop occurs.
   */
  onDrop = handler =>
    this.#tile.addEventListener('drop', event => handler(event));

  /**
   * Binds our tile's click event to the given handler.
   * @param {Function} handler The function we run whenever click occurs.
   */
  onClick = handler => {
    this.#tile.addEventListener('click', event => {
      this.sound.play();
      [...this.#tile.classList].includes('product') && handler();
    });
  };

  openTileEditor = (product, region, tile) => {
    this.container.classList.add('blurred');
    this.#productTitle.innerText = product;
    this.#regionTitle.innerText = region;
    this.#tileTitle.innerText = tile;
    this.#modal.style.display = 'flex';
  };

  /**
   * Turns our tile green.
   */
  setOccupied = () => this.addClass(this.#tile, 'product');

  /**
   * Turns our tile green.
   */
  removeOccupied = () => this.removeClass(this.#tile, 'product');
}
