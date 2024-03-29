export default class EditorController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.bindSave(this.#saveProduct);
    this.#view.bindRemove(this.#removeProduct);
    this.#view.setupObserver(this.#loadProduct);
  }

  /**
   * Calls the model to load the product from localStorage.
   * @param {string} tile The tile name.
   * @param {string} region The region name.
   */
  #loadProduct = (tile, region) => {
    if (!tile || !region) return;

    const product = this.#model.loadProduct(tile, region);

    this.#view.fillForm(product);
  };

  /**
   * Calls the model to save the product to localStorage.
   * @param {Product} product The edited product.
   * @param {string} region The region name.
   * @param {string} tile The tile name.
   */
  #saveProduct = (product, region, tile) =>
    product && region && tile && this.#model.saveProduct(product, region, tile);
  /**
   * Calls the model to remove the product to localStorage.
   * @param {string} region The region name.
   * @param {string} tile The tile name.
   */
  #removeProduct = (region, tile) =>
    region && tile && this.#model.removeProduct(region, tile);
}
