import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector('.form');
    // this._inputList = Array.from(document.querySelectorAll('.form__input'));
    this._inputList = this._popupForm.querySelectorAll('.form__input');
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

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmit(this._getInputValues());
    });
  };
};