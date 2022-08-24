import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.profile-form');
    this._submitButton = this._formElement.querySelector('.profile-form__save-button');
    this._initialCaption = this._submitButton.textContent;
  }

  open(id, card) {
    super.open();
    this._id = id;
    this._card = card;
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._id, this._card)
    })
  }

  savingMode(text) {
    this._submitButton.textContent = text;
  }

  setInitialCaption() {
    this._submitButton.textContent = this._initialCaption;
  }
}
