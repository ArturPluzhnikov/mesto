export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleCloseByEsc = this._handleCloseByEsc.bind(this);
    this._popupCloseButton = this._popup.querySelector('.close-button');
  };

  _handleCloseByEsc (evt) {
    if (evt.key === 'Escape') {
        this.close();
    };
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleCloseByEsc);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleCloseByEsc);
  };

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  };
};

