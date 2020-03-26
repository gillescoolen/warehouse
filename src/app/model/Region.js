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

    const storedTiles = JSON.parse(localStorage.getItem(`${this.#name}-tiles`));

    const storedProducts = JSON.parse(
      localStorage.getItem(`${this.#name}-products`)
    );

    storedTiles && storedTiles.length !== 0
      ? this._generateTilesFromStored(storedTiles)
      : this._generateTiles();

    storedProducts && storedProducts.length !== 0
      ? this._generateProductsFromStored(storedProducts)
      : this._generateProducts();

    localStorage.setItem(`${this.#name}-tiles`, JSON.stringify(this.#tiles));
    localStorage.setItem(
      `${this.#name}-products`,
      JSON.stringify(this.#products)
    );
  }

  _generateTiles = () => {
    for (let i = 0; i < 225; i++)
      this._addTile(new Tile(`tile-${i}`, this.name, this._isHazard(i)));
  };

  _generateTilesFromStored = tiles => {
    tiles.forEach(tile => {
      this._addTile(new Tile(tile.name, this.name, tile.occupant));
    });
  };

  _generateProducts = () => {
    this.#products = [
      new Product({
        name: `${this.#name} - Product 1`
      }),
      new Product({
        name: `${this.#name} - Product 2`
      })
    ];
  };

  _generateProductsFromStored = products => {
    products.forEach(product => this._addProduct(new Product({ ...product })));
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

  toJSON() {
    return {
      name: this.#name,
      tiles: this.#tiles,
      products: this.#products
    };
  }
}
