export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._submitButtonState = this._formElement.querySelector(this._submitButtonSelector);
    this._inputForm = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _setErrorMessage(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideErrorMessage = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
  };

  _showInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      this._setErrorMessage(inputElement);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      this._hideErrorMessage(inputElement);
    };
  };

  _hasInvalidInput() {
    return this._inputForm.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonView() {
    if (this._hasInvalidInput(this._inputForm)) {
      this._submitButtonState.classList.add(this._inactiveButtonClass);
      this._submitButtonState.disabled = true;
    } else {
      this._submitButtonState.classList.remove(this._inactiveButtonClass);
      this._submitButtonState.disabled = false;
    };
  };
  
  _setEventListeners(inputElement) {
    inputElement.addEventListener('input', () => {
      this._showInputValidity(inputElement);
      this._toggleButtonView();
    });
  };

  resetValidation() {
    this._inputForm.forEach(inputElement => {
      inputElement.classList.remove(this._inputErrorClass);
      this._hideErrorMessage(inputElement);
      this._toggleButtonView();
    });
  };

  enableValidation() {
    this._inputForm.forEach(inputElement => {
      this._setEventListeners(inputElement);
    });
  };
};