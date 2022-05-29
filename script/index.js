const editButton = document.querySelector('.profile__button-edit-profile');
const popup = document.querySelector('.popup');
const editCloseButton = document.querySelector('.popup__close-button');

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
})

editCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})


let editForm = document.querySelector('.profile-form');
let nameInput = document.querySelector('.profile-form__item_name');
let descrInput = document.querySelector('.profile-form__item_descr');
let profileName = document.querySelector('.profile__name');
let profileDescr = document.querySelector('.profile__descr');

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescr.textContent = descrInput.value;
}


editForm.addEventListener('submit', formSubmitHandler);

const saveButton = document.querySelector('.profile-form__save-button')

saveButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})
