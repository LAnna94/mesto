export default class Section {
  constructor({ items, renderer }, cardsContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(cardsContainer)
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(cardElement) {
    this._container.prepend(cardElement)
  }
}
