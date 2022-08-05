import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._pictureView = this._popupElement.querySelector('.popup__big-picture-photo');
    this._pictureCupture = this._popupElement.querySelector('.popup__big-picture-capture');
    super.setEventListeners();
  }

  open(cardData) {
    this._pictureView.src = cardData.link;
    this._pictureView.alt = cardData.name;
    this._pictureCupture.textContent = cardData.name;

    super.open()
  }
}
