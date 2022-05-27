import '../pages/index.css';

import { Api } from '../components/api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

// import { initialCards } from '../utils/initialCards.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  config,
  popupProfileOpenButton, 
  formProfileNameInput, 
  formProfileJobInput, 
  formProfileNameOutput,
  formProfileJobOutput,
  popupPlacesOpenButton, 
  cardTemplate, 
  formPlaces, 
  formProfile,
  popupImageSelector,
  popupProfileSelector,
  popupAddPlacesSelector,
  popupConfirmDeleteSelector,
  popupConfirmOpenButton,
  popupChangeAvatarOpenButton,
  popupChangeAvatarSelector,
  popupAvatar,
  formAvatar
} from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '7ec19880-e955-428d-8868-39ad3dda56bd',
    'Content-Type': 'application/json'
  }
}); 
// console.log(api)

///////////////////////////////////////////////////Получение данных с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([data, cards]) => {
  userInfo.setAvatar(data.avatar)
  userInfo.setUserInfo(data)
  section.renderItems(cards);
  console.log()
})
.catch(err => console.log(err));

///////////////////////////////////////////////////Создание и рендер новых карточек
function createCard(cardData, currentUser) {
  const card = new Card(
    cardData, 
    currentUser, 
    cardTemplate,
    () => popupWithImage.open({link: cardData.link, name: cardData.name}),
    (card) => popupConfirmDelete.open({element: card, id: cardData._id}),
    (likeData) => {
      if (!card.checkLikeState()) {
        api.addLike(cardData._id)
          .then((res) => card.likes = res.likes)
          .then(() => card.setLike())
      } else {
        api.deleteLike(cardData._id)
          .then((res) => card.likes = res.likes)
          .then(() => card.removeLike())
      };
    });
    // console.log(cardData)
  return card.generateCard()
};

const section = new Section(
  (cardItem) => {
    const cardElement = createCard(cardItem, "63c021edf932bd91bc589e5c");
    section.addItem(cardElement);
  }, '.elements');

///////////////////////////////////////////////////Работа с аватаром
const popupChangeAvatar = new PopupWithForm({
  popupSelector: popupChangeAvatarSelector,
  handleSubmit: (data) => {
    popupChangeAvatar.buttonState(true);

    api.changeAvatar(data)
    .then(() => {userInfo.setAvatar(data.avatar)})
    .then(() => {popupChangeAvatar.close()})
    .catch((err) => {console.log(`Ошибка: ${err}`)})
    .finally(() => {popupChangeAvatar.buttonState(false)})
  }
});

popupChangeAvatarOpenButton.addEventListener('click', function() {
  popupChangeAvatarValidation.resetValidation();
  popupChangeAvatar.open();
});
popupChangeAvatar.setEventListeners();

const popupChangeAvatarValidation = new FormValidator(config, formAvatar);

popupChangeAvatarValidation.enableValidation();

///////////////////////////////////////////////////Работа с информацией пользователя
const userInfo = new UserInfo({ 
  nameSelector: '.profile__title', 
  descriptionSelector: '.profile__subtitle', 
  avatarSelector: '.profile__avatar'
});

const popupEditProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleSubmit: 
    (data) => {popupEditProfile.buttonState(true);
    api.changeUserInfo(data)
      .then(data => {userInfo.setUserInfo(data),
      popupEditProfile.close()})
      .catch((err) => {console.log(`Ошибка: ${err}`)})
      .finally(() => {popupEditProfile.buttonState(false)})
  }
});

popupProfileOpenButton.addEventListener('click', function() {
  const userData = userInfo.getUserInfo();

  formProfileNameInput.value = userData.name;
  formProfileJobInput.value = userData.description;

  popupProfileValidation.resetValidation();
  popupEditProfile.open();
});
popupEditProfile.setEventListeners();

const popupProfileValidation = new FormValidator(config, formProfile);

popupProfileValidation.enableValidation();

///////////////////////////////////////////////////Добавление новых карточек
const popupAddPlaces = new PopupWithForm({
  popupSelector: popupAddPlacesSelector,
  handleSubmit: 
    (data) => {popupAddPlaces.buttonState(true);

    api.addNewCard(data)
      .then((data)=>{section.addItem(createCard(data, data.owner._id))})
      .then(()=>{popupAddPlaces.close()})
      .catch((err) => {console.log(`Ошибка: ${err}`)})
      .finally(() => {popupAddPlaces.buttonState(false)})
  }
});

popupPlacesOpenButton.addEventListener('click', function() {
  popupAddPlaces.open();
  popupAddPlacesValidation.resetValidation();
});
popupAddPlaces.setEventListeners();

const popupAddPlacesValidation = new FormValidator(config, formPlaces);

popupAddPlacesValidation.enableValidation();

///////////////////////////////////////////////////Удаление карточки
const popupConfirmDelete = new PopupConfirmDelete({
  popupSelector: popupConfirmDeleteSelector,
  handleSubmit: () => {
    console.log(popupConfirmDelete.cardElement)
    console.log(popupConfirmDelete.cardId)

    api.deleteCard(popupConfirmDelete.cardId)
      .then(() => popupConfirmDelete.deleteCard(popupConfirmDelete.cardElement))
      .then(() => popupConfirmDelete.close())
      .catch(err => console.log(err));
  }
});

popupConfirmDelete.setEventListeners();

///////////////////////////////////////////////////Зум карточки
const popupWithImage = new PopupWithImage(popupImageSelector);

popupWithImage.setEventListeners();