const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const placesContainer = document.querySelector('.elements');
const popupAddPlaces = document.querySelector('.popup-places');
const popupPhoto = document.querySelector('.popup-photo');
const popupProfile = document.querySelector('.popup-profile');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.grid-element');
const formPlaces = document.querySelector('.form-places');
const formProfile = document.querySelector('.form-profile')
const formTitle = document.querySelector('.form__input_type_title');
const formLink = document.querySelector('.form__input_type_link');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupPlacesOpenButton = document.querySelector('.profile__add-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup-profile__close-button');
const popupPlacesCloseButton = popupAddPlaces.querySelector('.popup-places__close-button');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup-photo__close-button');
const formProfileNameInput = document.querySelector('.form__input_type_name');
const formProfileJobInput = document.querySelector('.form__input_type_description');
const formProfileNameOutput = document.querySelector('.profile__title');
const formProfileJobOutput = document.querySelector('.profile__subtitle');
const popupPhotoImage = popupPhoto.querySelector('.popup-photo__image');
const popupPhotoTitle = popupPhoto.querySelector('.popup-photo__title');


function handleFormProfileSubmit(evt) {
  evt.preventDefault();
    formProfileNameOutput.textContent = formProfileNameInput.value;
    formProfileJobOutput.textContent = formProfileJobInput.value;
    closePopup(popupProfile);
};

const createCard = (item) => {
  const cardElement = cardTemplate.querySelector('.grid-element').cloneNode(true);
  const cardImage = cardElement.querySelector('.grid-element__image');
  const cardTitle = cardElement.querySelector('.grid-element__title');
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  addListeners(cardElement);
  return cardElement;
};

const renderCard = (data) => {
  const cardElement = createCard(data);
  placesContainer.prepend(cardElement);
};

function handleFormPlacesSubmit (evt) {
  evt.preventDefault();
  renderCard({name: formTitle.value, link: formLink.value});
  closePopup(popupAddPlaces);
  formPlaces.reset();
};

initialCards.forEach(card => {
	renderCard(card);
});

function handleDeleteCard(evt) {
  evt.target.closest('.grid-element').remove();
};

function handleLikeCard(evt) {
  evt.target.classList.toggle('grid-element__emoji_active');
};

function handleScaleCard(evt) {
  openPopup(popupPhoto);
  popupPhotoImage.src = evt.target.src;
  popupPhotoImage.alt = evt.target.alt;
  popupPhotoTitle.textContent = evt.target.alt;
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function addListeners(el) {
  el.querySelector('.grid-element__trash').addEventListener('click', handleDeleteCard);
  el.querySelector('.grid-element__emoji').addEventListener('click', handleLikeCard);
  el.querySelector('.grid-element__image').addEventListener('click', handleScaleCard);
};
formPlaces.addEventListener('submit', handleFormPlacesSubmit);
formProfile.addEventListener('submit', handleFormProfileSubmit); 
popupProfileOpenButton.addEventListener('click', () => {
  formProfileNameInput.value = formProfileNameOutput.textContent;
  formProfileJobInput.value = formProfileJobOutput.textContent;
  openPopup(popupProfile)
});
popupPlacesOpenButton.addEventListener('click', () => openPopup(popupAddPlaces))
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
popupPlacesCloseButton.addEventListener('click', () => closePopup(popupAddPlaces));