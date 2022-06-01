const editButton = document.querySelector('.profile__button-edit-profile');
const popup = document.querySelector('.popup');
const editCloseButton = document.querySelector('.popup__close-button');
let editForm = document.querySelector('.profile-form');
let nameInput = document.querySelector('.profile-form__input_type_name');
let descrInput = document.querySelector('.profile-form__input_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescr = document.querySelector('.profile__description');

nameInput.value = profileName.textContent;
descrInput.value = profileDescr.textContent;

function closePopup () {
  popup.classList.remove('popup_opened');
}

function openPopup () {
  popup.classList.add('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescr.textContent = descrInput.value;

    closePopup();
}

editForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
editCloseButton.addEventListener('click', closePopup);
