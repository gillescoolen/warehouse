export default class EditorController {
  #view;
  #model;

  constructor(model, view) {
    this.#view = view;
    this.#model = model;
  }
}
