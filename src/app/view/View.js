export default class View {
  constructor() {}

  /**
   * Creates an element.
   * @param {string} tag The tag of the element we want to create.
   * @param {string} id The id we want to identify the element by.
   * @param {string[]} classNames The classnames we want the element to have.
   */
  createElement(tag, id, classNames) {
    const element = document.createElement(tag);

    element.id = id;

    // Add classnames to the element we create.
    if (classNames) {
      for (const className of classNames) {
        element.classList.add(className);
      }
    }

    return element;
  }

  /**
   * Retrieve an element from the DOM.
   * @param {string} selector The selector we define.
   */
  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  /**
   * Retrieve multiple elements from the DOM.
   * @param {string} selector The selector we define.
   */
  getMultipleElements(selector) {
    const element = document.querySelectorAll(selector);

    return element;
  }
}
