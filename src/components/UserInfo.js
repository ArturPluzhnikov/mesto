export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
    console.log(this._avatar.src)
    console.log(this._name.textContent)
  };
  
  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
      // avatar: this._avatar.src
    };
  };
  

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._description.textContent = about;
  };

  setAvatar(link) {
    // this._avatar.src = link.avatar;
    this._avatar.style.backgroundImage = `url(${link})`;
  }
};

