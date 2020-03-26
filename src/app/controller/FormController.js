export default class FormController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.bindPagination(this.#next, this.#previous);
  }

  #next = product => {
    if (product) return console.log(product);

    this.#model.next();
    this.#view.show(this.#model.page);
  };

  #previous = () => {
    this.#model.previous();
    this.#view.show(this.#model.page);
  };
}
