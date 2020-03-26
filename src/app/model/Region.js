/**
 * A tile which can be occupied by a product or hazard.
 * @typedef {Object} Region
 * @property {string} name The grid (section) name.
 * @property {Tile[]} tiles Every tile inside of the section.
 * @property {Product[]} products The products belonging to our region.
 */

import { Tile } from '.';
import { Product } from '.';

export default class Region {
  #name = '';
  #tiles = [];
  #products = [];

  constructor(name) {
    this.#name = name;

    this.#products = [
      new Product({
        name: `${this.#name} - Product 1`,
        region: this
      }),
      new Product({
        name: `${this.#name} - Product 2`,
        region: this
      })
    ];

    this._generateTiles();
  }

  _generateTiles = () => {
    for (let i = 0; i < 225; i++) {
      this._addTile(new Tile(`tile-${i}`, this._isHazard(i)));
    }
  };

  _addTile = tile => this.tiles.push(tile);
  _addProduct = product => this.products.push(product);

  _isHazard = index =>
    index % this.#name.length === 0 ? { name: 'hazard' } : null;

  set name(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set tiles(tiles) {
    this.#tiles = tiles;
  }

  get tiles() {
    return this.#tiles;
  }

  set products(products) {
    this.#products = products;
  }

  get products() {
    return this.#products;
  }
}
