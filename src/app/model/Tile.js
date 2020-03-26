/**
 * A tile which can be occupied by a product or hazard.
 * @typedef {Object} Tile
 * @property {string} name The tile name, something like tile-69;
 * @property {Object} occupant The object that occupies the tile, like a product or hazard.;
 */

export default class Tile {
  #name = '';
  #region = '';
  #occupant = { name: '' };

  constructor(name, region, occupant) {
    this.#name = name;
    this.#region = region;
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
  hasProduct = () =>
    this.#occupant && this.#occupant.name && this.#occupant.name !== 'hazard';

  getClassName() {
    if (this.hasHazard()) return 'hazard';

    if (this.hasProduct()) return 'product';

    return 'open';
  }

  save = () => {
    const data = JSON.parse(localStorage.getItem(this.#region));

    data.tiles.forEach(tile => {
      if (tile.name === this.#name) tile.occupant = this.#occupant;
    });

    localStorage.setItem(this.#region, JSON.stringify(data));
  };

  toJSON() {
    return {
      name: this.#name,
      region: this.#region,
      occupant: this.#occupant
    };
  }
}
