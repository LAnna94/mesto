export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.place__card').cloneNode(true);

    return cardElement
  }

  generateCard() {
    this.element = this._getTemplate();
    this._placePhoto = this.element.querySelector('.place__photo');
    this._likeButton = this.element.querySelector('.place__like-button');
    this._setEventListeners();

    this._placePhoto.src = this._link;
    this._placePhoto.alt = this._name;
    this.element.querySelector('.place__header').textContent = this._name

    return this.element
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton()
    });

    this._placePhoto.addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link})
    });

    this.element.querySelector('.place__remove-button').addEventListener('click', () => {
      this.element.remove();
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('place__like-button_active');
  }
}
