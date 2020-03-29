import mp3 from '../assets/sounds/sound.mp3';

export default class View {
  container;
  sound = new Audio(mp3);

  constructor() {
    this.container = this.getElement(`.container`);
  }

  /**
   * Creates an element.
   * @param {string} tag The tag of the element we want to create.
   * @param {string} id The id we want to identify the element by.
   * @param {string[]} classNames The classnames we want the element to have.
   */
  createElement = (tag, id, classNames) => {
    const element = document.createElement(tag);

    element.id = id;

    // If there are any classnames, add them to our element.
    if (classNames) {
      for (const className of classNames) {
        element.classList.add(className);
      }
    }

    return element;
  };

  /**
   * Creates an input element.
   * @param {string} id The id we want to identify the element by.
   * @param {string} type The classnames we want the element to have.
   * @param {string} placeholder The placeholder we want our input to have.
   */
  createInput = (id, type, placeholder) => {
    const input = this.createElement('input', id);

    input.type = type && type;
    input.placeholder = placeholder && placeholder;

    return input;
  };

  /**
   * Retrieve an element from the DOM.
   * @param {string} selector The selector we define.
   */
  getElement = selector => document.querySelector(selector);

  /**
   * Retrieve multiple elements from the DOM.
   * @param {string} selector The selector we define.
   */
  getMultipleElements = selector => document.querySelectorAll(selector);

  /**
   * Adds a class to the given element.
   * @param {Object} element The element we add te class to.
   * @param {string} className The class we want to add.
   */
  addClass = (element, className) => element.classList.add(className);

  /**
   * Adds a class to the given element.
   * @param {Object} element The element we add te class to.
   * @param {string} className The class we want to add.
   */
  removeClass = (element, className) => element.classList.remove(className);

  /**
   * Clears all children inside the given node.
   * @param {Object} node The element node we clear the children of.
   */
  clear = node => {
    while (node.firstChild) node.removeChild(node.firstChild);
  };
}
