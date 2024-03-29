import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.profile-form');
    this._inputList = this._formElement.querySelectorAll('.profile-form__input');
    this._submitButton = this._formElement.querySelector('.profile-form__save-button');
    this._initialCaption = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {}

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues())
    })
  }

  close() {
    super.close();
    this._formElement.reset()
  }

  savingMode(text) {
    this._submitButton.textContent = text;
  }

  setInitialCaption() {
    this._submitButton.textContent = this._initialCaption;
  }

}
