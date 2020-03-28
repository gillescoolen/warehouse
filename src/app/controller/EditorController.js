export default class EditorController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.bindSave(this.#saveProduct);
    this.#view.setupObserver(this.#loadProduct);
  }

  #loadProduct = (tile, region) => {
    if (!tile || !region) return;

    const product = this.#model.loadProduct(tile, region);

    this.#view.fillForm(product);
  };

  #saveProduct = (product, region, tile) => {
    if (product && region && tile)
      this.#model.saveProduct(product, region, tile);
  };
}
