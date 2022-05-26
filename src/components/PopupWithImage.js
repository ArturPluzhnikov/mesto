import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoImage = this._popup.querySelector('.popup-photo__image');
    this._popupPhotoTitle = this._popup.querySelector('.popup-photo__title');
  };
  
  open({link, name}) {
    super.open();
    this._popupPhotoImage.src = link;
    this._popupPhotoImage.alt = name;
    this._popupPhotoTitle.textContent = name;
  };
};