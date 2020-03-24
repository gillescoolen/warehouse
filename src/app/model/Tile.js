/**
 * A tile which can be occupied by a product or hazard.
 * @typedef {Object} Tile
 * @property {Object} occupant The object that occupies the tile, like a product or hazard.;
 */

export default class Tile {
  #occupant;

  constructor(occupant) {
    this.#occupant = occupant;
  }

  get occupant() {
    return this.#occupant;
  }

  set occupant(occupant) {
    this.#occupant = occupant;
  }
}
