import './pages/index.css';
import './components/card.js';
import './components/modal.js';
import './components/validation.js';

import {createCard} from "./components/card.js"
import { setSubmitButtonState,  closePopup, openPopup } from "./components/modal.js";
import { initialCards } from "./scripts/cards.js";

import { enableValidation, clearValidation } from "./components/validation.js";

import { getMe,getCards } from './components/api.js';

(function () {
// поиск DOM-элементов на странице 
const placesList = document.querySelector(".places__list");
const editForm = document.forms['edit-profile'];
const editPopup = document.querySelector('.popup_type_edit');
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileAvatar = document.querySelector(".profile__image")
const profileDescription = document.querySelector(".profile__description");
const newCardForm = document.forms['new-place']; // getting form by name
const placeName = newCardForm.elements['place-name']; // getting form elements
const newCardImageLink = newCardForm.elements.link;
const submitProfileButton = newCardForm.querySelector('.popup__button');
const addNewCardButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


// Попапы и их элементы + проверка
const imagePopup = document.querySelector(".popup_type_image");
let popupImage, popupCaption;
  if (imagePopup) {
    popupImage = imagePopup.querySelector(".popup__image");
    popupCaption = imagePopup.querySelector(".popup__caption");
  }


// FUNCTION ADDING CARD
function addCard(nameValue, linkValue, placesList) {
  placesList.prepend(createCard({
    name: nameValue,
    link: linkValue
  }));
}


// Обработчик submit
editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  // NEW Data
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editPopup);
});


// Button EDDTING
editButton.addEventListener('click', ()=>{

  // CURRENT data of progile
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  // ВАлидация кнопки добавления новой карточки
  setSubmitButtonState(editForm.querySelector(".popup__button"), submitProfileButton);
  openPopup(editPopup);
});


newCardPopup
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closePopup(newCardPopup);
  });


// Отправка формы
newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addCard(placeName.value, newCardImageLink.value, placesList);
  newCardForm.reset();
  closePopup(newCardPopup);
  setSubmitButtonState(false, submitProfileButton);
});

// Валидация формы профиля
newCardForm.addEventListener("input", function () {
  const isValid = placeName.value.length > 0 && newCardImageLink.value.length > 0;
  setSubmitButtonState(isValid, submitProfileButton);

});


// функция-обработчик для открытия попапа (ред проф-ль)
addNewCardButton.addEventListener("click", function () {
  openPopup(newCardPopup);
  clearValidation(newCardPopup, validationConfig);
});


// Добавляем наши 6 начальных карт
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  placesList.append(cardElement);
});

// Обработчик на весь список карточек /"делегирование события"
placesList.addEventListener('click', (evt) => {
  // Проверка клика на картинке
  if (evt.target.classList.contains('card__image')) {
    const card = evt.target.closest('.card');
    const cardTitle = card.querySelector('.card__title');
    
    const cardData = {
      link: evt.target.src,
      name: evt.target.alt || cardTitle.textContent
    };

  // Заполняем попап данными
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openPopup(imagePopup);
  }
});

// включение валидации вызовом enableValidation
// все настройки передаются при вызове


enableValidation(validationConfig);


// Привет🤍 Твой токен ca9c73cd-774d-4dee-9109-08215140258b
// Идентификатор нашей когорты wff-cohort-41
// return fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
//   headers: {
//     authorization: 'ca9c73cd-774d-4dee-9109-08215140258b'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });


//  return fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
//   headers: {
//     authorization: 'ca9c73cd-774d-4dee-9109-08215140258b'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

async function UpdateMe(){
const response = await getMe();

  if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json();
  
  profileTitle.innerHTML = json['name'];
  profileDescription.innerHTML =  json['about'];
  profileAvatar.style.backgroundImage=`url(${json[`avatar`]})`;

  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}
UpdateMe();


async function checkRequest(){
  const response = await getCards();

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json();
    console.log(json);
    
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}
//checkRequest();

async function updCards(){
  const response = await getCards();

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json();
    console.log(json);
    
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

  updCards()

 })(); 