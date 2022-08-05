export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector)
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    }

    return userInfo
  }

  setUserInfo({ username, description }) {
    this._profileName.textContent = username;
    this._profileDescription.textContent = description;
  }
}
