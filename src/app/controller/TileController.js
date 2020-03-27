export default class TileController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.onDrop(this.addOccupant);
  }

  addOccupant = event => {
    if (this.#model.hasHazard()) return;

    const product = JSON.parse(event.dataTransfer.getData('product'));

    console.log(product);

    if (!product.name) return;

    this.#model.setOccupant(product.name);
    this.#view.setOccupied();
  };

  removeOccupant = () => (this.#model.occupant = null);
}
