import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

import { initialCards } from '../utils/initialCards.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  config,
  popupProfileOpenButton, 
  formProfileNameInput, 
  formProfileJobInput, 
  popupPlacesOpenButton, 
  cardTemplate, 
  formPlaces, 
  formProfile,
  popupImageSelector,
  popupProfileSelector,
  popupAddPlacesSelector,
} from '../utils/constants.js';


const userInfo = new UserInfo({nameSelector:'.profile__title', descriptionSelector:'.profile__subtitle'});

const section = new Section({
  items: initialCards,
  renderer: (item)=> {
    const cardElement = createCard(item.link, item.name);
    section.addItem(cardElement);
  }
}, '.elements');

const popupWithImage = new PopupWithImage(popupImageSelector);

const popupEditProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close();
  }
});

const popupAddPlaces = new PopupWithForm({
  popupSelector: popupAddPlacesSelector,
  handleSubmit: (data) => {
    console.log(data)
    section.addItem(createCard(data.linkPlaces, data.titlePlaces));
    popupAddPlaces.close();
    popupAddPlacesValidation.resetValidation();
  }
});

const popupAddPlacesValidation = new FormValidator(config, formPlaces);
const popupProfileValidation = new FormValidator(config, formProfile);

section.renderItems();
popupProfileValidation.enableValidation();
popupAddPlacesValidation.enableValidation();

function createCard(link, title) {
  const card = new Card(link, title, cardTemplate, handleCardClick);
  return card.generateCard();
};

function handleCardClick(link, title) {
  popupWithImage.open(link, title);
};

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddPlaces.setEventListeners();
popupProfileOpenButton.addEventListener('click', function() {
  const userData = userInfo.getUserInfo();

  formProfileNameInput.value = userData.name;
  formProfileJobInput.value = userData.description;

  popupProfileValidation.resetValidation();
  popupEditProfile.open();
});
popupPlacesOpenButton.addEventListener('click', function() {
  popupAddPlaces.open();
});