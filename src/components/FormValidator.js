export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._setErrorMessage(inputElement);
    } else {
      this._hideErrorMessage(inputElement);
    };
  };

  _setErrorMessage(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  _hideErrorMessage = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  };

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonView() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    };
  };
  
  _setEventListeners(inputElement) {
    inputElement.addEventListener('input', () => {
      this._showInputValidity(inputElement);
      this._toggleButtonView();
    });
    this._toggleButtonView();
  };

  resetValidation() {
    this._toggleButtonView();

    this._inputList.forEach(inputElement => {
      this._hideErrorMessage(inputElement);
    });
  };

  enableValidation() {
    this._inputList.forEach(inputElement => {
      this._setEventListeners(inputElement);
    });
  };
};