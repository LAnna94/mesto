export const buttonEditProfile = document.querySelector('.profile__button-edit-profile');
export const formEditProfile = document.querySelector('.profile-form');
export const nameInput = document.querySelector('.profile-form__input_type_name');
export const descriptionInput = document.querySelector('.profile-form__input_type_description');
export const avatarInput = document.querySelector('.profile-form__input_type_avatar')
export const buttonAddCard = document.querySelector('.profile__add-button');
export const formAddCard = document.querySelector('.add-form');
export const formEditAvatar = document.querySelector('.edit-avatar');
export const buttonEditAvatar = document.querySelector('.profile__edit-avatar')
export const profileInfo = {
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
  profileAvatarSelector: '.profile__avatar',
}

export const options = {
  url: "https://nomoreparties.co/v1/cohort-48",
  headers: {
    "content-type": "application/json",
    authorization: "bc7cbda7-f07a-4c36-9693-73a9934c2ba4"
  }
}
