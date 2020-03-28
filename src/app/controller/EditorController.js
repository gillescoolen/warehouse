export default class EditorController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.setupObserver(this.#loadProduct);
  }

  #loadProduct = (productName, regionName) => {
    if (!productName) return;

    const product = this.#model.loadProduct(productName, regionName);

    this.#view.fillForm(product);
  };
}
