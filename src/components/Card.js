export class Card {
  constructor(link, name, cardTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  };
  
  _getTemplate() {
    const userElement = this._cardTemplate.content.querySelector('.grid-element').cloneNode(true);
    return userElement;
  };

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.grid-element__image');
    this._card.querySelector('.grid-element__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._setEventListeners();

    return this._card;
  };

  _setEventListeners() {
    this._card.querySelector('.grid-element__trash').addEventListener('click', () => {
      this._card.remove();
    });

    this._card.querySelector('.grid-element__emoji').addEventListener('click', (evt) => {
      evt.target.classList.toggle('grid-element__emoji_active');
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  };
};

