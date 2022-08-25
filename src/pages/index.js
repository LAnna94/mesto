import './index.css';
import Card from '../components/Card.js';
import { config } from '../utils/validate.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  buttonEditProfile,
  formEditProfile,
  nameInput,
  descriptionInput,
  buttonAddCard,
  formAddCard,
  profileInfo,
  formEditAvatar,
  buttonEditAvatar,
  options
} from '../utils/constants.js';
import Api from '../components/Api.js';

let userId

const api = new Api(options)


const profileForm = new FormValidator(config, formEditProfile);
profileForm.enableValidation()

const formNewCard = new FormValidator(config, formAddCard);
formNewCard.enableValidation()

const formNewAvatar = new FormValidator(config, formEditAvatar);
formNewAvatar.enableValidation()

const newUser = new UserInfo(profileInfo)




// Открытие попапа удаления карточки
const handleRemoveCard = (card) => {
  formWithComfirm.open(card)
}

// Удаление карточки
const deleteCard = (card) => {
  formWithComfirm.savingMode('Удаление...')
  api.deleteCard(card._id)
  .then(() => {
    card.deleteCard();
    formWithComfirm.close()
  })
  .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
  .finally(() => formWithComfirm.setInitialCaption())
}

const formWithComfirm = new PopupWithConfirmation('#remove-card', deleteCard);
formWithComfirm.setEventListeners()



// Форма редактирования профиля
const handleFormEditSubmit = (inputValues) => {
  formEditUserInfo.savingMode('Сохранение...')
  api.setProfileInfo(inputValues)
  .then((res) => {
    newUser.setUserInfo(res);
    formEditUserInfo.close()
  })
  .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
  .finally(() => formEditUserInfo.setInitialCaption())
}

const formEditUserInfo = new PopupWithForm('#edit-form', handleFormEditSubmit)
formEditUserInfo.setEventListeners()

buttonEditProfile.addEventListener('click', () => {
  formEditUserInfo.open();

  profileForm.resetValidation();

  const userInfo = newUser.getUserInfo()
  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.about;

});


// Форма редактирования аватара
const handleFormNewAvatar = (inputValues) => {
  formEditAvatarPhoto.savingMode('Сохранение...')
  api.setNewAvatar(inputValues)
  .then((res) => {
    newUser.setAvatar(res);
    formEditAvatarPhoto.close()
  })
  .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
  .finally(() => formEditAvatarPhoto.setInitialCaption())
}

const formEditAvatarPhoto = new PopupWithForm('#edit-avatar', handleFormNewAvatar)
formEditAvatarPhoto.setEventListeners()

buttonEditAvatar.addEventListener('click', () => {
  formEditAvatarPhoto.open()

  formNewAvatar.resetValidation();
})

const formConfirmDelete = new Popup('#remove-card');
formConfirmDelete.setEventListeners()



// лайк карточки
const handleLikeClick = (card) => {
  if(!card.isLiked) {
    api.addLike(card._id)
    .then((cardData) => {
      card.setLikes(cardData.likes);
      card.addCardLike();
    })
    .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
  } else {
    api.deleteLike(card._id)
    .then((cardData) => {
      card.setLikes(cardData.likes)
      card.removeCardLike();
    })
    .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
  }
}


const createCard = (item, cardSelector, handleClickImage, handleLikeClick, userId, handleRemoveCard) => {
  const card = new Card(item, cardSelector, handleClickImage, handleLikeClick, userId, handleRemoveCard);
  const cardElement = card.generateCard();

  return cardElement
}

// Форма добавления новой карточки
const handleFormAddCard = (inputValues) => {
  formAddNewCard.savingMode('Создание...')
  api.addNewCard(inputValues)
  .then((res) => {
    initialSection.addItem(createCard(res, '.place-template', openImage, handleLikeClick, userId, handleRemoveCard));
    formAddNewCard.close();
  })
  .catch((err) => console.log('Ошибка. Запрос не выполнен: ', err))
  .finally(() => formAddNewCard.setInitialCaption())
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
  items: {},
  renderer: (cardItem) => {
    initialSection.addItem(createCard(cardItem, '.place-template', openImage, handleLikeClick, userId, handleRemoveCard));
  }
}, '.place')



// загрузка первоначальной информации на страницу: карточки + пользователь
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then(([dataUserInfo, initialCardsData]) => {
  newUser.setUserInfo(dataUserInfo);
  newUser.setAvatar(dataUserInfo);
  userId = dataUserInfo._id;
  initialSection.renderItems(initialCardsData, userId);
})
.catch(err => console.log('Ошибка. Запрос не выполнен: ', err))

