import Card from './Card.js';
import { config } from './validate.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js'

const buttonEditProfile = document.querySelector('.profile__button-edit-profile');
const popupEditProfile = document.querySelector('#edit-form');
const formEditProfile = document.querySelector('.profile-form');
const nameInput = document.querySelector('.profile-form__input_type_name');
const descriptionInput = document.querySelector('.profile-form__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#add-form');
const newPlaceName = document.querySelector('.profile-form__input_type_placename');
const newPlaceLink = document.querySelector('.profile-form__input_type_link');
const imagePopup = document.querySelector('#big-picture');
const pictureView = document.querySelector('.popup__big-picture-photo');
const pictureCupture = document.querySelector('.popup__big-picture-capture');
const cardsContainer = document.querySelector('.place');
const formAddCard = document.querySelector('.add-form');

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  popup.removeEventListener('mousedown', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupOnEsc);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('mousedown', closePopupByOverlay);
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');

    closePopup(popupOpened);
  };
}

function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget)
  }
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  profileForm.resetValidation()

  openPopup(popupEditProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(popupEditProfile);
}

function openAddCardPopup() {
  formAddCard.reset();
  formNewCard.resetValidation();

  openPopup(popupAddCard);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
buttonEditProfile.addEventListener('click', openProfilePopup);
buttonAddCard.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', renderCard);


const openImage = (cardData) => {
  pictureView.src = cardData.link;
  pictureView.alt = cardData.name;
  pictureCupture.textContent = cardData.name;

  openPopup(imagePopup);
}

function createCard(item) {
  const card = new Card(item, '.place-template', openImage);
  const cardElement = card.generateCard();

  return cardElement
}

initialCards.forEach((element) => {
  const cardElement = createCard(element);
  cardsContainer.append(cardElement)
})

function renderCard(evt) {
  evt.preventDefault();

  const newCardData = {
    name: newPlaceName.value,
    link: newPlaceLink.value,
  }

  const cardElement = createCard(newCardData);

  cardsContainer.prepend(cardElement);
  closePopup(popupAddCard);
}


const profileForm = new FormValidator (config, formEditProfile);
const formNewCard = new FormValidator (config, formAddCard)

profileForm.enableValidation()
formNewCard.enableValidation()
