import Model from './Model';
import { Tile, Product } from '.';

export default class Region extends Model {
  #name = '';
  #tiles = [];
  #products = [];

  constructor(name) {
    super();

    this.#name = name;

    const storedTiles = this.load(`${this.#name}-tiles`);
    const storedProducts = this.load(`${this.#name}-products`);

    storedTiles && storedTiles.length !== 0
      ? this.#loadTiles(storedTiles)
      : this.#generateTiles();

    storedProducts && storedProducts.length !== 0
      ? this.#loadProducts(storedProducts)
      : this.#generateProducts();
  }

  /**
   * Generate tiles fron nothing and saves them.
   */
  #generateTiles = () => {
    for (let i = 0; i < 225; i++)
      this.#addTile(new Tile(`tile-${i}`, this.#name, this.#isHazard(i)));

    this.save(`${this.#name}-tiles`, this.#tiles);
  };

  /**
   * Turn data from localStorage into actual tiles and add them.
   */
  #loadTiles = tiles => {
    tiles.forEach(tile => {
      this.#addTile(new Tile(tile.name, this.#name, tile.occupant));
    });
  };

  /**
   * Generate products from nothing and save them.
   */
  #generateProducts = () => {
    this.#products = [
      new Product({
        name: `${this.#name} - Product 1`
      }),
      new Product({
        name: `${this.#name} - Product 2`
      })
    ];

    this.save(`${this.#name}-products`, this.#products);
  };

  /**
   * Turn data from localStorage into actual products and add them.
   */
  #loadProducts = products => {
    this.#products = [];
    products.forEach(product => this.#addProduct(new Product({ ...product })));
  };

  /**
   * Add a tile to our tiles.
   */
  #addTile = tile => this.tiles.push(tile);

  /**
   * Add a product to our products.
   */
  #addProduct = product => this.products.push(product);

  /**
   * Calculate if the current tile should have a hazard.
   */
  #isHazard = index =>
    index % this.#name.length === 0 ? { name: 'hazard' } : null;

  /**
   * Refreshes the products with products loaded from localStorage.
   */
  refreshProducts = () => {
    const products = this.load(`${this.#name}-products`);
    this.#loadProducts(products);
  };

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
