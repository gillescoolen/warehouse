import View from './View';

export default class TileView extends View {
  #tile;
  #tileSquare;
  #modal;
  #container;

  constructor(tile) {
    super();
    this.#tile = tile;
    this.#tileSquare = this.getElement(`#${tile.name}`);
    this.#modal = this.getElement(`.modal`);
    this.#container = this.getElement(`.container`);

    this.onDragOver();
    this.onClick();
  }

  /**
   * Prevents the default dragover action on our tile.
   */
  onDragOver = () => {
    this.#tileSquare.addEventListener('dragover', event =>
      event.preventDefault()
    );
  };

  /**
   * Binds our tile's drop event to the given handler.
   * @param {Function} handler The function we run whenever drop occurs.
   */
  onDrop = handler => {
    this.#tileSquare.addEventListener('drop', event => {
      handler(event);
    });
  };

  /**
   * Binds our tile's click event to the given handler.
   * @param {Function} handler The function we run whenever click occurs.
   */
  onClick = handler => {
    this.#tileSquare.addEventListener('click', event => {
      this.#container.classList.add('blurred');
      this.#modal.style.display = 'flex';
      handler(this.#tileSquare);
    });
  };

  /**
   * Turns our tile green.
   */
  setOccupied = () => this.addClass(this.#tileSquare, 'product');

  /**
   * Turns our tile green.
   */
  removeOccupied = () => this.removeClass(this.#tileSquare, 'product');
}
