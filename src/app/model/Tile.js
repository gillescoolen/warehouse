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

  /**
   * Check if the tile has a product.
   */
  hasProduct = () => this.#occupant && this.#occupant.name !== 'hazard';

  /**
   * Check if the tile has a hazard.
   */
  hasHazard = () => this.#occupant && this.#occupant.name === 'hazard';

  /**
   * Get a fitting classname based on the occupant.
   */
  getClassName = () => {
    if (this.hasHazard()) return 'hazard';

    if (this.hasProduct()) return 'product';

    return 'open';
  };

  /**
   * Sets the occupant to the product that matches the given name.
   * @param {string} name The product name.
   */
  setOccupant = name => {
    const products = this.load(`${this.#region}-products`);

    this.occupant = products.find(product => product.name === name);

    this.#save();
  };

  /**
   * Saves the tile to localstorage.
   */
  #save = () => {
    const tiles = this.load(`${this.#region}-tiles`);

    tiles.forEach(tile => {
      if (tile.name === this.#name) tile.occupant = this.#occupant;
    });

    this.save(`${this.#region}-tiles`, tiles);
  };

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

  get region() {
    return this.#region;
  }

  set region(region) {
    this.#region = region;
  }

  toJSON() {
    return {
      name: this.#name,
      region: this.#region,
      occupant: this.#occupant
    };
  }
}
