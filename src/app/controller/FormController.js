export default class FormController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;

    this.#view.bindPagination(this.#next, this.#previous);
  }

  #next = () => {
    this.#model.next();
    this.#view.show(this.#model.page);
  };

  #previous = () => {
    this.#model.previous();
    this.#view.show(this.#model.page);
  };
}
