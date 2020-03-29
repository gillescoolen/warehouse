/**
 * The model that stores our editor data.
 * @typedef {Object} Editor
 */

import Model from './Model';

export default class Editor extends Model {
  constructor() {
    super();
  }

  /**
   * Load the product from localStorage.
   * @param {string} tile The tile name.
   * @param {string} region The region name.
   */
  loadProduct = (tileName, regionName) => {
    const tiles = this.load(`${regionName}-tiles`);

    const tile = tiles.find(tile => tile.name === tileName);

    return tile.occupant;
  };

  /**
   * Saves the product to localStorage.
   * @param {Product} product The edited product.
   * @param {string} region The region name.
   * @param {string} tile The tile name.
   */
  saveProduct = (product, region, tileName) => {
    const tiles = this.load(`${region}-tiles`);

    tiles.forEach(tile => {
      if (tile.name === tileName) tile.occupant = product;
    });

    this.save(`${region}-tiles`, tiles);
  };

  /**
   * Removes the product from localStorage.
   * @param {string} region The region name.
   * @param {string} tile The tile name.
   */
  removeProduct = (region, tileName) => {
    const tiles = this.load(`${region}-tiles`);

    tiles.forEach(tile => {
      if (tile.name === tileName) tile.occupant = null;
    });

    this.save(`${region}-tiles`, tiles);
  };
}
