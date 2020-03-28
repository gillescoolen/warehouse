export default class TileController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.onDrop(this.addOccupant);
    this.#view.onClick(() => this.#editOccupant());
  }

  /**
   * Adds an occupant to the tile.
   * @param {Object} event The event from the drop listener.
   */
  addOccupant = event => {
    if (this.#model.hasHazard()) return;

    const product = JSON.parse(event.dataTransfer.getData('product'));

    if (!product.name) return;

    this.#model.setOccupant(product.name);
    this.#view.setOccupied();
  };

  /**
   * Removes the occupant.
   */
  removeOccupant = () => (this.#model.occupant = { name: '' });

  #editOccupant = () => {
    if (!this.#model.hasProduct()) return;
    this.#view.openTileEditor(this.#model.occupant.name, this.#model.region);
  };
}
