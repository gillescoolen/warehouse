export default class FormController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.bindPagination(this.#next, this.#previous);
  }

  /**
   * Navigates to the next page.
   * If the product and region are set it creates the product.
   * @param {Product} product The product we want to create.
   * @param {string} region The region the product belongs to.
   */
  #next = (product, region) => {
    product && region && this.#create();

    this.#model.next();
    this.#view.show(this.#model.page);
  };

  /**
   * Navigates to the previous step.
   */
  #previous = () => {
    this.#model.previous();
    this.#view.show(this.#model.page);
  };

  /**
   * Creates the product and clears the form.
   * @param {Product} product The product we want to create.
   * @param {string} region The region the product belongs to.
   */
  #create = (product, region) => {
    this.#model.addProduct(product, region);
    this.#view.updateProductSelect(product, region);
    this.#view.resetForm();
    this.#model.page = 0;
  };
}
