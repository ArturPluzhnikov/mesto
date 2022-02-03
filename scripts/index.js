let popupOpenButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_description');
let nameOutput = document.querySelector('.profile__title');
let jobOutput = document.querySelector('.profile__subtitle');

function openPopup() {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
  popup.classList.add('popup__opened');
};

function closePopup(evt) {
  popup.classList.remove('popup__opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    closePopup(evt);
};

form.addEventListener('submit', formSubmitHandler); 
popupCloseButton.addEventListener('click', closePopup);
popupOpenButton.addEventListener('click', openPopup);