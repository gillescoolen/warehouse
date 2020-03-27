export default class FormController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.bindPagination(this.#next, this.#previous);
  }

  #next = (product, region) => {
    if (product) {
      this.#model.addProduct(product, region);
      this.#view.updateProductSelect(product, region);
      this.#view.resetForm();
      this.#model.page = 0;

      return;
    }

    this.#model.next();
    this.#view.show(this.#model.page);
  };

  #previous = () => {
    this.#model.previous();
    this.#view.show(this.#model.page);
  };
}
