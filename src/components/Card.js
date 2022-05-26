export class Card {
  constructor(cardData, currentUser, cardTemplate, handleCardClick, handleDeleteCard, handleLikeCard) {
    this._cardTemplate = cardTemplate;
    this._card = this._getTemplate();
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._currentUser = currentUser;
    this._cardOwnerId = cardData.owner._id;
    this._id = cardData._id;
    this._cardImage = this._card.querySelector('grid-element__image');
    this.likes = cardData.likes
    this._handleLikeCard = handleLikeCard;
    // console.log(this.likes)
  };

  generateCard() {
    this._cardImage = this._card.querySelector('.grid-element__image');
    this._card.querySelector('.grid-element__title').textContent = this._name;
    this._trashButton = this._card.querySelector('.grid-element__trash');
    this._cardLike = this._card.querySelector('.grid-element__emoji');
    this._cardLikeCounter = this._card.querySelector('.grid-element__emoji-counter');
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    
    if (this._cardOwnerId !== this._currentUser) {
      this._trashButton.remove();
    };

    this._setLikeState();
    this._setEventListeners();

    return this._card;
  };

  _getTemplate() {
    const userElement = this._cardTemplate.content.querySelector('.grid-element').cloneNode(true);
    
    return userElement;
  };

  checkLikeState() {
    return this.likes.some(item => item._id === this._currentUser);
  };
  
  _setLikeState() {
    if (this.checkLikeState()) {
      this.setLike();
    } else {
      this.removeLike();
    };
  };

  setLike() {
    this._cardLike.classList.add('grid-element__emoji_active');
    this._cardLikeCounter.textContent = this.likes.length;
  };

  removeLike() {
    this._cardLike.classList.remove('grid-element__emoji_active');
    this._cardLikeCounter.textContent = this.likes.length;
  };
  
  _setEventListeners() {
    this._trashButton.addEventListener('click', () => {
      this._handleDeleteCard(this._card)
    });

    this._card.querySelector('.grid-element__emoji').addEventListener('click', () => {
      this._handleLikeCard(this._card)
  });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  };
};

