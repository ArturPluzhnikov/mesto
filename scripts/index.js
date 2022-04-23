import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
};

const popupPhoto = document.querySelector('.popup-photo');
const popupPhotoImage = popupPhoto.querySelector('.popup-photo__image');
const popupPhotoTitle = popupPhoto.querySelector('.popup-photo__title');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.close-button');
const formProfileNameInput = document.querySelector('.form__input_type_name');
const formProfileJobInput = document.querySelector('.form__input_type_description');
const formProfileNameOutput = document.querySelector('.profile__title');
const formProfileJobOutput = document.querySelector('.profile__subtitle');
const placesContainer = document.querySelector('.elements');
const popupPlacesOpenButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup-profile');
const popupAddPlaces = document.querySelector('.popup-places');
const formTitle = document.querySelector('.form__input_type_title');
const formLink = document.querySelector('.form__input_type_link');
const cardTemplate = document.querySelector('#card-template').content;
const formPlaces = popupAddPlaces.querySelector('.form-places');
const formProfile = popupProfile.querySelector('.form-profile');

const popupAddPlacesValidation = new FormValidator(config, formPlaces);
const popupProfileValidation = new FormValidator(config, formProfile);

const renderCard = (data) => {
  const cardElement = createCard(data);
  placesContainer.prepend(cardElement);
};

function createCard(cardInfo) {
  const card = new Card(cardInfo, cardTemplate);
  const cardElement = card.generateCard();

  return cardElement;
};

function openPopup(popups) {
  popups.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEsc); ;
};

function openPopupProfile() {
  formProfileNameInput.value = formProfileNameOutput.textContent;
  formProfileJobInput.value = formProfileJobOutput.textContent;
  popupProfileValidation.resetValidation();
  openPopup(popupProfile);
};

function openPopupAddPlaces() {
  popupAddPlacesValidation.resetValidation();
  formPlaces.reset();
  openPopup(popupAddPlaces);
};

function closePopup(popups) {
  popups.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEsc);
};

function handleCloseByEsc (evt) {
  if (evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
  };
};

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
  };
});

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  formProfileNameOutput.textContent = formProfileNameInput.value;
  formProfileJobOutput.textContent = formProfileJobInput.value;
  closePopup(popupProfile);
};

function handleFormPlacesSubmit(evt) {
  evt.preventDefault();
  renderCard({ name: formTitle.value, link: formLink.value });

  closePopup(popupAddPlaces);
};

export function handleScaleCard(imageLink, imageName) {
  openPopup(popupPhoto);

  popupPhotoImage.src = imageLink;
  popupPhotoImage.alt = imageName;
  popupPhotoTitle.textContent = imageName;
};

popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupPlacesOpenButton.addEventListener('click', openPopupAddPlaces);
formProfile.addEventListener('submit', handleFormProfileSubmit);
formPlaces.addEventListener('submit', handleFormPlacesSubmit);
popupCloseButtons.forEach(function(el) {
  const popup = el.closest('.popup');
  el.addEventListener('click', function() {
    closePopup(popup);
  });
});

popupProfileValidation.enableValidation();
popupAddPlacesValidation.enableValidation();

initialCards.forEach(card => {
	renderCard(card);
});
