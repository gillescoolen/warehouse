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

  setOccupant = name => {
    const products = JSON.parse(
      localStorage.getItem(`${this.#region}-products`)
    );
    const product = products.find(product => product.name === name);

    this.occupant = product;

    this._save();
  };

  _save = () => {
    const tiles = JSON.parse(localStorage.getItem(`${this.#region}-tiles`));

    tiles.forEach(tile => {
      if (tile.name === this.#name) tile.occupant = this.#occupant;
    });

    localStorage.setItem(`${this.#region}-tiles`, JSON.stringify(tiles));
  };

  toJSON() {
    return {
      name: this.#name,
      region: this.#region,
      occupant: this.#occupant
    };
  }
}
