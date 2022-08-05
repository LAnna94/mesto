import './index.css';
import Card from '../components/Card.js';
import { config } from '../utils/validate.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const buttonEditProfile = document.querySelector('.profile__button-edit-profile');
const formEditProfile = document.querySelector('.profile-form');
const nameInput = document.querySelector('.profile-form__input_type_name');
const descriptionInput = document.querySelector('.profile-form__input_type_description');
const buttonAddCard = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.add-form');
const profileInfo = {
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
}



const profileForm = new FormValidator(config, formEditProfile);
profileForm.enableValidation()

const formNewCard = new FormValidator(config, formAddCard)
formNewCard.enableValidation()



const newUser = new UserInfo(profileInfo)



const handleFormEditSubmit = (inputValues) => {
  newUser.setUserInfo(inputValues);

  formEditUserInfo.close()
}

const formEditUserInfo = new PopupWithForm('#edit-form', handleFormEditSubmit)
formEditUserInfo.setEventListeners()

buttonEditProfile.addEventListener('click', () => {
  formEditUserInfo.open();

  profileForm.resetValidation();

  const userInfo = newUser.getUserInfo()
  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.description;
});



const createCard = (item, cardSelector, handleClickImage) => {
  const card = new Card(item, cardSelector, handleClickImage);
  const cardElement = card.generateCard();

  return cardElement
}

const handleFormAddCard = (inputValues) => {
  initialSection.addItem(createCard(inputValues, '.place-template', openImage));
  formAddNewCard.close();
}

const formAddNewCard = new PopupWithForm('#add-form', handleFormAddCard);
formAddNewCard.setEventListeners()

buttonAddCard.addEventListener('click', () => {
  formAddNewCard.open();

  formNewCard.resetValidation();
});



const picturePreview = new PopupWithImage('#big-picture');

const openImage = (cardData) => {
  picturePreview.open({ name: cardData.name, link: cardData.link })
}



const initialSection = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    initialSection.addItem(createCard(cardItem, '.place-template', openImage));
  }
}, '.place')

initialSection.renderItems()
