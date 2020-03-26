export default class TileController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.onDrop(this.addOccupant);
  }

  addOccupant = event => {
    console.log(event);

    if (this.#model.hasHazard()) {
      console.log('Tile has a hazard.');
      return;
    }

    console.log('No hazard found..');

    const product = JSON.parse(event.dataTransfer.getData('product'));

    if (!product.name) return;

    this.#model.setOccupant(product.name);

    this.#view.setOccupied();
  };

  removeOccupant = () => (this.#model.occupant = null);
}
