const formOpenButton = document.querySelector('.profile__edit-button')
const form = document.querySelector('.form')
const formCloseButton = document.querySelector('.form__close')
const formSubmit = document.querySelector('.form__button')
const nameInput = document.querySelector('.form__data_name')
const jobInput = document.querySelector('.form__data_description')
const nameOutput = document.querySelector('.profile__title')
const jobOutput = document.querySelector('.profile__subtitle')

function openForm() {
  nameInput.value = nameOutput.textContent
  jobInput.value = jobOutput.textContent
  form.classList.add('form__opened')
};

formOpenButton.addEventListener('click', openForm)

function closeForm() {
  form.classList.remove('form__opened')
}

formCloseButton.addEventListener('click', closeForm)


function formSubmitHandler(evt) {
  evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    closeForm();
}

form.addEventListener('submit', formSubmitHandler); 

