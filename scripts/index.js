const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const form = document.querySelector('.form')
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_description');
const nameOutput = document.querySelector('.profile__title');
const jobOutput = document.querySelector('.profile__subtitle');
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
const popupPlaces = document.querySelector('.popup_places');
const popupPlacesCloseButton = popupPlaces.querySelector('.popup_places__close-button');
const popupPlacesOpenButton = document.querySelector('.profile__add-button');
const formPlaces = document.querySelector('.form_places');
const placesContainer = document.querySelector('.elements');
const placeTemplate = document.querySelector('#place-template').content;
const popupSized = document.querySelector('.popup_sized');
const popupSizedCloseButton = popupSized.querySelector('.popup_sized__close-button');
const popupSizedImage = popupSized.querySelector('.popup_sized__image');
const popupSizedTitle = popupSized.querySelector('.popup_sized__title');


function renderCards(initialCards) {
  const placeElement = placeTemplate.querySelector('.grid-element').cloneNode(true);
  placeElement.querySelector('.grid-element__title').textContent = initialCards.name;
  placeElement.querySelector('.grid-element__image').src = initialCards.link;
  placeElement.querySelector('.grid-element__image').alt = initialCards.name;
  
  addListeners(placeElement);
  placesContainer.prepend(placeElement);
};

initialCards.forEach(renderCards)

function openPopupProfile() {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
  popupProfile.classList.add('popup_opened');
};

function closePopup() {
  popupProfile.classList.remove('popup_opened');
  popupPlaces.classList.remove('popup_opened');
  popupSized.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    closePopup(evt);
};

function openPopupPlaces() {
popupPlaces.classList.add('popup_opened');
};

function handleDelete(evt) {
  evt.target.closest('.grid-element').remove();
}

function handleLike(evt) {
  evt.target.closest('.grid-element__emoji').classList.toggle('grid-element__emoji_active');
}

function handleSize(evt) {
  document.querySelector('.popup_sized').classList.add('popup_opened');
  popupSizedImage.src = evt.target.closest('.grid-element__image').src;
  popupSizedTitle.textContent = evt.target.closest('.grid-element__image').alt;
};

function addNewCard (evt) {
  evt.preventDefault();
  const placeElement = placeTemplate.querySelector('.grid-element').cloneNode(true);
  placeElement.querySelector('.grid-element__image').src = popupPlaces.querySelector('.form__input_type_description').value;
  placeElement.querySelector('.grid-element__title').textContent = popupPlaces.querySelector('.form__input_type_name').value;
  placeElement.querySelector('.grid-element__image').alt = popupPlaces.querySelector('.form__input_type_name').value;
  closePopup(evt);
  addListeners(placeElement);
  placesContainer.prepend(placeElement);
};

form.addEventListener('submit', formSubmitHandler); 
popupProfileCloseButton.addEventListener('click', closePopup);
popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupSizedCloseButton.addEventListener('click', closePopup);
popupPlacesOpenButton.addEventListener('click', openPopupPlaces)
popupPlacesCloseButton.addEventListener('click', closePopup);
formPlaces.addEventListener('submit', addNewCard);
function addListeners(el) {
  el.querySelector('.grid-element__trash').addEventListener('click', handleDelete);
  el.querySelector('.grid-element__emoji').addEventListener('click', handleLike);
  el.querySelector('.grid-element__image').addEventListener('click', handleSize);
}




