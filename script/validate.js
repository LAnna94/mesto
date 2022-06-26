/* const formElement = document.querySelector('.profile-form');
const formInput = formElement.querySelector('.profile-form__input');
const formError = formElement.querySelector(`.${formInput.id}-error`); */

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('profile-form__input_type_error');

  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('profile-form__input_type_error');

  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.profile-form__input'));
  const buttonElement = formElement.querySelector('.profile-form__save-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('profile-form__save-button_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('profile-form__save-button_disabled');
    buttonElement.removeAttribute('disabled');
  }
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.profile-form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListener(formElement);
  })
}

enableValidation({
  formSelector: '.profile-form',
  inputSelector: '.profile-form__input',
  submitButtonSelector: '.profile-form__save-button',
  inactiveButtonClass: '.profile-form__save-button_disabled',
  inputErrorClass: '.profile-form__input_type_error',
  errorClass: '.profile-form__input-error'
});

// enableValidation();


