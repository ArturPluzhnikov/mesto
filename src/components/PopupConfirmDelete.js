import Popup from './Popup.js';

export default class PopupConfirmDelete extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitButton = this._popup.querySelector('.form-confirm-delete__button');
  };

  open(data) {
    super.open();
    this.cardElement = data.element;
    this.cardId = data.id;
    
    // console.log(this._card)
  };

  deleteCard(item) {
    console.log(item)
    item.remove();
  };

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
        this._handleSubmit();
    });
  };
};