let formOpenButton = document.querySelector('.profile__edit-button')
let form = document.querySelector('.form')
let formCloseButton = document.querySelector('.form__close')
let formSubmit = document.querySelector('.form__button')
let nameInput = document.querySelector('.form__data_name')
let jobInput = document.querySelector('.form__data_description')
let nameOutput = document.querySelector('.profile__title')
let jobOutput = document.querySelector('.profile__subtitle')

function openForm() {
  nameInput.value = nameOutput.textContent
  jobInput.value = jobOutput.textContent
  form.classList.add('form__opened')
};

formOpenButton.addEventListener('click', openForm)

function closeForm(evt) {
  evt.preventDefault();
  form.classList.remove('form__opened')
}

formCloseButton.addEventListener('click', closeForm)


function formSubmitHandler(evt) {
  evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    closeForm(evt);
}

form.addEventListener('submit', formSubmitHandler); 

