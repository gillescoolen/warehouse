/**
 * A tile which can be occupied by a product or hazard.
 * @typedef {Object} Tile
 * @property {string} name The tile name, something like tile-69;
 * @property {string} region The region name, something like clothes;
 * @property {Object} occupant The object that occupies the tile, like a product or hazard.;
 */

import Model from './Model';

export default class Tile extends Model {
  #name = '';
  #region = '';
  #occupant = { name: '' };

  constructor(name, region, occupant) {
    super();

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
    const products = this.load(`${this.#region}-products`);

    const product = products.find(product => product.name === name);

    this.occupant = product;

    this.#save();
  };

  #save = () => {
    const tiles = this.load(`${this.#region}-tiles`);

    tiles.forEach(tile => {
      if (tile.name === this.#name) tile.occupant = this.#occupant;
    });

    this.save(`${this.#region}-tiles`, tiles);
  };

  toJSON() {
    return {
      name: this.#name,
      region: this.#region,
      occupant: this.#occupant
    };
  }
}
