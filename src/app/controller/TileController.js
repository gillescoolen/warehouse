export default class TileController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.bindAddProduct(this.#model.name, this.addOccupant);
  }

  addOccupant(occupant) {
    console.log(occupant);
  }

  removeOccupant(occupant) {}
}
