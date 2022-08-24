export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      id: this._id,
      avatar: this._avatar
    }

    return userInfo
  }

  setUserInfo({ name, about, _id }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = about;
    this._id = _id;
  }

  setAvatar({ avatar }) {
    this._profileAvatar.src = avatar;
  }
}


