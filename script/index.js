const buttonEditProfile = document.querySelector('.profile__button-edit-profile');
const popupEditProfile = document.querySelector('#edit-form');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
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
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const imageCloseButton = imagePopup.querySelector('.popup__close-button')
const pictureView = document.querySelector('.popup__big-picture-photo');
const pictureCupture = document.querySelector('.popup__big-picture-capture');
const cardTemplate = document.querySelector('.place-template').content
const cardsContainer = document.querySelector('.place');
const formAddCard = document.querySelector('.add-form');
const initialCards = [
  {
    name: 'Судак',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  popup.removeEventListener('click', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupOnEsc);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');

    closePopup(popupOpened);
  };
}

function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget)
  };
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
}

function handleSubmitForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(popupEditProfile);
}

function openAddPopup() {
  const buttonAddCard = document.querySelectorAll('.profile-form__save-button');

  formAddCard.reset();
  disableButton(buttonAddCard[1]);

  openPopup(popupAddCard);
}

const createCard = (name, link) => {
  const cardElement = cardTemplate.querySelector('.place__card').cloneNode(true);
  const cardElementPhoto = cardElement.querySelector('.place__photo');

  cardElementPhoto.src = link;
  cardElementPhoto.alt = name;
  cardElement.querySelector('.place__header').textContent = name;

  cardElement.querySelector('.place__like-button').addEventListener('click', handleLikeButton);

  cardElement.querySelector('.place__remove-button').addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardElementPhoto.addEventListener('click', () => {
    pictureView.src = link;
    pictureView.alt = name;
    pictureCupture.textContent = name;

    openPopup(imagePopup);
  });

  return cardElement;
}

function deleteCard(item) {
  item.remove();
}

function handleLikeButton(e) {
  e.target.classList.toggle('place__like-button_active');
}

initialCards.forEach(function (element) {
  cardsContainer.append(createCard(element.name, element.link))
})

function renderCard(evt) {
  evt.preventDefault();

  cardsContainer.prepend(createCard(newPlaceName.value, newPlaceLink.value));
  closePopup(popupAddCard);
}

formEditProfile.addEventListener('submit', handleSubmitForm);
buttonEditProfile.addEventListener('click', openProfilePopup);
buttonAddCard.addEventListener('click', openAddPopup);
popupAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);
});
imageCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
});
popupEditProfileCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
formAddCard.addEventListener('submit', renderCard);
enableValidation(config);
