export default class Card {
  constructor(data, selector, openImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._openImage = openImagePopup;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.place__card').cloneNode(true);

    return cardElement
  }

  generateCard() {
    this.element = this._getTemplate();
    this._placePhoto = this.element.querySelector('.place__photo');
    this._setEventListeners();

    this._placePhoto.src = this._link;
    this._placePhoto.alt = this._name;
    this.element.querySelector('.place__header').textContent = this._name

    return this.element
  }

  _setEventListeners() {
    this.element.querySelector('.place__like-button').addEventListener('click', () => {
      this._handleLikeButton()
    });

    this.element.querySelector('.place__photo').addEventListener('click', () => {
      this._openImage({name: this._name, link: this._link})
    });

    this.element.querySelector('.place__remove-button').addEventListener('click', () => {
      this.element.remove();
    });
  }

  _handleLikeButton() {
    this.element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
  }
}
