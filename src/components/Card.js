export default class Card {
  constructor(data, selector, handleCardClick, handleLikeElement, userId, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this.likes = data.likes;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLikeElement = handleLikeElement;
    this._handleDeleteCard = handleDeleteCard;
    this._userId = userId;
    this.isLiked = data.likes.some(like => like._id === this._userId)
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.place__card').cloneNode(true);

    return cardElement
  }

  generateCard() {
    this.element = this._getTemplate();
    this._placePhoto = this.element.querySelector('.place__photo');
    this._likeButton = this.element.querySelector('.place__like-button');
    this._likesCounter = this.element.querySelector('.place__like-number');
    this._removeButton = this.element.querySelector('.place__remove-button');
    this._setEventListeners();

    this._placePhoto.src = this._link;
    this._placePhoto.alt = this._name;
    this.element.querySelector('.place__header').textContent = this._name;

    this._likesCounter.textContent = this.likes.length;

    if (this._ownerId != this._userId) {
      this._removeButton.remove();
    }

    if (this.isLiked) {
      this.addCardLike();
    }

    return this.element
  }


  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeElement(this);
    }
    );

    this._placePhoto.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link })
    });

    this._removeButton.addEventListener('click', () => {
      this._handleDeleteCard(this);
    })
  }

  addCardLike() {
    this._likeButton.classList.add('place__like-button_active');
    this.isLiked = true;
  }

  removeCardLike() {
    this._likeButton.classList.remove('place__like-button_active');
    this.isLiked = false;
  }

  setLikes(likes) {
    this.likes = likes;
    this._likesCounter.textContent = this.likes.length;
  }

  deleteCard() {
    this.element.remove();
    this.element = null;
  }
}




