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
const newCardForm = document.forms['new-place']; // getting form by name
const placeName = newCardForm.elements['place-name']; // getting form elements
const newCardImageLink = newCardForm.elements.link;
const submitProfileButton = newCardForm.querySelector('.popup__button');
const addNewCardButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const newCardPopup = document.querySelector('.popup_type_new-card');


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

  // VALIDATION
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

// Валидация формы
newCardForm.addEventListener("input", function () {
  const isValid = placeName.value.length > 0 && newCardImageLink.value.length > 0;
  setSubmitButtonState(isValid, submitProfileButton);
});


// функция-обработчик события открытия модального окна для редактирования профиля
addNewCardButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});


// for( let i = 0 ; i< initialCards.length; i++ ){
//   const cardData = initialCards[i];
//   const createdElement = createCard(cardData);

//   const cardImage = createdElement.querySelector('.card__image');

//   cardImage.addEventListener('click', () => {
//     const imagePopup = document.querySelector(".popup_type_image");
//     const popupImage = imagePopup.querySelector(".popup__image");
//     const popupCaption = imagePopup.querySelector(".popup__caption");

//     popupImage.src = cardData.link;
//     popupImage.alt = cardData.name;
//     popupCaption.textContent = cardData.name;

//     openPopup(imagePopup);
//   });

//   placesList.append(createdElement);
// }

// 1. Сначала создаем и добавляем все начальные карточки (без обработчиков)
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  placesList.append(cardElement);
});

// Обработчик на весь список карточек /делегирование события
placesList.addEventListener('click', (evt) => {
  // Проверка клика на изображение 
  if (evt.target.classList.contains('card__image')) {
    const card = evt.target.closest('.card');
    const cardTitle = card.querySelector('.card__title');
    
    // Получаем данные карточки
    const cardData = {
      link: evt.target.src,
      name: evt.target.alt || cardTitle.textContent
    };

    // Находим попап и его элементы
    const imagePopup = document.querySelector(".popup_type_image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    // Заполняем попап данными
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    // Открываем попап
    openPopup(imagePopup);
  }
});

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
//const imagePopup = document.querySelector('.popup_type_image');

// Обработчик закрытия по крестику
//imagePopup.querySelector('.popup__close').addEventListener('click', ()=>{
//  closePopup(imagePopup);
//s});

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
//Закрытие по оверлею
document.addEventListener('click', (evt) => {
  const openedPopup = getOpenedPopup();
  if (!openedPopup) return;

  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
});

// Закрытие по дефолтному кресту в углуы
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    const openedPopup = getOpenedPopup();
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

 })(); 