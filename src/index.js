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

    // Попапы и их элементы
    const imagePopup = document.querySelector(".popup_type_image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    // Заполняем попап данными
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openPopup(imagePopup);
  }
});


function getOpenedPopup() {
  return document.querySelector('.popup_is-opened');
}

// Закрытие по Escape
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

// Закрытие по дефолтному кресту в углу
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    const openedPopup = getOpenedPopup();
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

 })(); 