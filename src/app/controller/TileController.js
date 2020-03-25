export default class TileController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.bindAddProduct(this.addOccupant);
  }

  addOccupant(occupant) {
    console.log('pressed addOccupant');
  }

  removeOccupant(occupant) {}
}
