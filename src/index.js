import './pages/index.css';
import './components/card.js';
import './components/modal.js'

import {createCard} from "./components/card.js"
import { setSubmitButtonState,  closePopup, openPopup } from "./components/modal.js";
import { initialCards } from "./scripts/cards.js";

(function () {
// поиск DOM-элементов на странице 
const placesList = document.querySelector(".places__list");
const editForm = document.forms['edit-profile'];
const editPopup = document.querySelector('.popup_type_edit');
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const form = document.forms['new-place']; // getting form by name
const placeName = form.elements['place-name']; // getting form elements
const link = form.elements.link;
const submitButton = form.querySelector('.popup__button');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const newCardPopup = document.querySelector('.popup_type_new-card');


// FUNCTION ADDING CARD
function addCard(nameValue, linkValue, placesList) {
  placesList.prepend(createCard({
    name: nameValue,
    link: linkValue
  }));
}

// CLOSE by OVERLAY
//newCardPopup.addEventListener("click", function (evt) {
//  if (evt.target === newCardPopup) {
//    closePopup(newCardPopup);
//  }
//});

// CLOSE by "X" and Overlay
//editPopup
//  .querySelector(".popup__close")
//  .addEventListener("click", () => closePopup(editPopup));
//editPopup.addEventListener("click", (evt) => {
//  if (evt.target === editPopup) {
//    closePopup(editPopup);
//  }
//});


// AND CLOSE POPUP
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

  // VALIDATION
  setSubmitButtonState(editForm.querySelector(".popup__button"), submitButton);
  openPopup(editPopup);
});


newCardPopup
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closePopup(newCardPopup);
  });


// Отправка формы
form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addCard(placeName.value, link.value, placesList);
  form.reset();
  closePopup(newCardPopup);
  setSubmitButtonState(false, submitButton);
});

// Валидация формы
form.addEventListener("input", function () {
  const isValid = placeName.value.length > 0 && link.value.length > 0;
  setSubmitButtonState(isValid, submitButton);
});


// функция-обработчик события открытия модального окна для редактирования профиля
addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});


for( let i = 0 ; i< initialCards.length; i++ ){
  const cardData = initialCards[i];
  const createdElement = createCard(cardData);

  const cardImage = createdElement.querySelector('.card__image');

  cardImage.addEventListener('click', () => {
    const imagePopup = document.querySelector(".popup_type_image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openPopup(imagePopup);
  });

  placesList.append(createdElement);
}

// Инициализация начальных 6 карточек
// initialCards.forEach(function (cardData) {
//   const createdElement = createCard(cardData);
//   placesList.append(createdElement);

//    // OPEN IMAGE BY CLICK
//   cardImage.addEventListener('click', () => {

//     const imagePopup = document.querySelector(".popup_type_image");
//     const popupImage = imagePopup.querySelector(".popup__image");
//     const popupCaption = imagePopup.querySelector(".popup__caption");

//     popupImage.src = cardData.link;
//     popupImage.alt = cardData.name;
//     popupCaption.textContent = cardData.name;

//     openPopup(imagePopup);
//   });
// });


// Получаем элементы попапа изображения
const imagePopup = document.querySelector('.popup_type_image');

// Обработчик закрытия по крестику
imagePopup.querySelector('.popup__close').addEventListener('click', ()=>{
  closePopup(imagePopup);
});

// Функция для поиска открытого попапа
function getOpenedPopup() {
  return document.querySelector('.popup_is-opened');
}

// Обработчик закрытия по Escape для всех попапов
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = getOpenedPopup();
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

document.addEventListener('click', (evt) => {
  const openedPopup = getOpenedPopup();
  if (!openedPopup) return;

  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
});

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    const openedPopup = getOpenedPopup();
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

 })(); 