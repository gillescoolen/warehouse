/**
 * A tile which can be occupied by a product or hazard.
 * @typedef {Object} Tile
 * @property {string} name The tile name, something like tile-69;
 * @property {Object} occupant The object that occupies the tile, like a product or hazard.;
 */

export default class Tile {
  #name = '';
  #occupant;

  constructor(name, occupant) {
    this.#name = name;
    this.#occupant = occupant;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get occupant() {
    return this.#occupant;
  }

  set occupant(occupant) {
    this.#occupant = occupant;
  }

  hasHazard = () => this.#occupant && this.#occupant.name === 'hazard';
}
