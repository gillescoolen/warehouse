import View from './View';

export default class ProductView extends View {
  #form;
  #name;
  #description;
  #buyPrice;
  #sellPrice;
  #minimumStored;
  #currentStored;

  #tabs;
  #shown;
  #warning;

  #nextButton;
  #previousButton;

  constructor() {
    super();

    this.#form = this.getElement('#form');

    this.#loadFormElements();

    this.show(0);
  }

  #loadFormElements = () => {
    this.#name = this.getElement('#name');
    this.#description = this.getElement('#description');
    this.#buyPrice = this.getElement('#buyPrice');
    this.#sellPrice = this.getElement('#sellPrice');
    this.#minimumStored = this.getElement('#minimumStored');
    this.#currentStored = this.getElement('#currentStored');

    this.#nextButton = this.getElement('#next');
    this.#previousButton = this.getElement('#previous');

    this.#tabs = this.getMultipleElements('.tab');
    this.#warning = this.getElement('.warning');
  };

  #next = handler => {
    this.#clearError();

    if (!this.#shown) return;

    [...this.#shown.children].find(
      input => input.localName === 'input' && input.value.trim().length === 0
    )
      ? this.#showError('Niet alle velden zijn ingevuld.')
      : handler();
  };

  #previous = handler => {
    handler();
  };

  #clearError = () => (this.#warning.innerText = '');
  #showError = message => (this.#warning.innerText = message);

  bindPagination = (next, previous) => {
    this.#nextButton.addEventListener('click', event => this.#next(next));
    this.#previousButton.addEventListener('click', event =>
      this.#previous(previous)
    );
  };

  show(tab) {
    this.#tabs.forEach(tab => (tab.style.display = 'none'));

    if (tab === this.#tabs.length) {
      this.#nextButton.innerHTML = 'Voeg toe';
      return;
    }

    tab === 0
      ? this.#previousButton.setAttribute('disabled', true)
      : this.#previousButton.removeAttribute('disabled');

    this.#shown = this.#tabs[tab];
    this.#shown.style.display = 'flex';
  }
}
