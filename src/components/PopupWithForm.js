import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector('.form');
    this._inputList = this._popupForm.querySelectorAll('.form__input');
    this._submitButton = this._popup.querySelector('.form__button')
  };

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach( (input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  };

  close() {
    super.close();
    this._popupForm.reset();
  };

  buttonState(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent  = 'Сохранить';
    }
  }

  // removeInProgress(text) {
  //   this._submitButton.textContent = text;
  // };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmit(this._getInputValues());
    });
  };
};