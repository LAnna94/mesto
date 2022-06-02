const editButton = document.querySelector('.profile__button-edit-profile');
const popup = document.querySelector('.popup');
const editCloseButton = document.querySelector('.popup__close-button');
const editForm = document.querySelector('.profile-form');
const nameInput = document.querySelector('.profile-form__input_type_name');
const descrInput = document.querySelector('.profile-form__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__description');


function closePopup () {
  popup.classList.remove('popup_opened');
}

function openPopup () {
  nameInput.value = profileName.textContent;
  descrInput.value = profileDescr.textContent;

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
