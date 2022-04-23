import { handleScaleCard } from "./index.js";

export class Card {
  constructor(card, cardTemplate) {
    this._name = card.name;
    this._link = card.link;
    this._cardTemplate = cardTemplate;
  };

  _getTemplate() {
    const cardElement = this._cardTemplate.querySelector('.grid-element').cloneNode(true);

    return cardElement;
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
      handleScaleCard(this._link, this._name);
    });
  };
};