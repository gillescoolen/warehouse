/**
 * One model to rule them all.
 * @typedef {Object} Model
 */

export default class Model {
  constructor() {}

  /**
   * Stringifies the data and saves it to localStorage.
   * @param {string} key The key we identify the item with.
   * @param {Object} data The data we stringify and store.
   */
  save = (key, data) => localStorage.setItem(key, JSON.stringify(data));

  /**
   * Loads data from localStorage and parses it back to an object.
   * @param {string} key The key we identify the item with.
   */
  load = key => JSON.parse(localStorage.getItem(key));
}
