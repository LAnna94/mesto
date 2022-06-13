const editButton = document.querySelector('.profile__button-edit-profile');
const popup = document.querySelector('.popup');
const editCloseButton = popup.querySelector('.popup__close-button');
const editForm = document.querySelector('.profile-form');
const nameInput = document.querySelector('.profile-form__input_type_name');
const descriptionInput = document.querySelector('.profile-form__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('#add-form');
const newPlaceName = document.querySelector('.profile-form__input_type_placename');
const newPlaceLink = document.querySelector('.profile-form__input_type_link');
const bigPicturePopup = document.querySelector('#big-picture');
const addCloseButton = addPopup.querySelector('.popup__close-button');
const bigPictureCloseButton = bigPicturePopup.querySelector('.popup__close-button')
const bigPicture = document.querySelector('.popup-big-picture__photo');
const pictureCupture = document.querySelector('.popup-big-picture__capture');


function closePopup () {
  popup.classList.remove('popup_opened') || addPopup.classList.remove('popup_opened') || bigPicturePopup.classList.remove('popup_opened');
}


function openPopup () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  popup.classList.add('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closePopup();
}

function openAddPopup () {
  newPlaceName.value = 'Название';
  newPlaceLink.value = 'Ссылка на картинку';

  addPopup.classList.add('popup_opened');
}


const cardTemplate = document.querySelector('.place-template').content
const cardList = document.querySelector('.place');
const addForm = document.querySelector('.add-form');
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


initialCards.forEach(function (element) {
  const cardElement = cardTemplate.querySelector('.place__card').cloneNode(true);

  cardElement.querySelector('.place__photo').src = element.link;
  cardElement.querySelector('.place__header').textContent = element.name;

  cardElement.querySelector('.place__like-button').addEventListener('click', (e) => {
    e.target.classList.toggle('place__like-button_active');
  });

  cardElement.querySelector('.place__remove-button').addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardElement.querySelector('.place__photo').addEventListener('click', () => {
    bigPicture.src = element.link;
    pictureCupture.textContent = element.name;

    bigPicturePopup.classList.add('popup_opened')
  });

  cardList.append(cardElement);
})

function formAddCard (evt) {
  evt.preventDefault();

  const cardElement = cardTemplate.querySelector('.place__card').cloneNode(true);

  cardElement.querySelector('.place__photo').src = newPlaceLink.value;
  cardElement.querySelector('.place__header').textContent = newPlaceName.value;

  cardElement.querySelector('.place__like-button').addEventListener('click', (e) => {
    e.target.classList.toggle('place__like-button_active');
  });

  cardElement.querySelector('.place__remove-button').addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardElement.querySelector('.place__photo').addEventListener('click', () => {
    bigPicture.src = newPlaceLink.value;
    pictureCupture.textContent = newPlaceName.value;

    bigPicturePopup.classList.add('popup_opened')
  });

  cardList.prepend(cardElement);
  closePopup();
}

function deleteCard (item) {
  item.remove();
}

editForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
editCloseButton.addEventListener('click', closePopup);
addButton.addEventListener('click', openAddPopup);
addCloseButton.addEventListener('click', closePopup);
bigPictureCloseButton.addEventListener('click', closePopup);
addCloseButton.addEventListener('click', closePopup);
addForm.addEventListener('submit', formAddCard);
