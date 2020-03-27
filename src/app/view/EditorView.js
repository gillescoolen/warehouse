import View from './View';

export default class EditorView extends View {
  #editor;

  constructor() {
    super();

    this.#editor = this.getElement('#editor');

    this.bindOnDragStart();
  }
}
