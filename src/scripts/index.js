import {createCard, addCard} from "./card.js"
import { setSubmitButtonState, openEditPopup,closeImagePopup, closePopup, openPopup } from "../components/modal.js";

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







// Обработчики событий

// CLOSE by OVERLAY
newCardPopup.addEventListener("click", function (evt) {
  if (evt.target === newCardPopup) {
    closePopup(newCardPopup);
  }
});

// CLOSE by "X" and Overlay
editPopup
  .querySelector(".popup__close")
  .addEventListener("click", () => closePopup(editPopup));
editPopup.addEventListener("click", (evt) => {
  if (evt.target === editPopup) {
    closePopup(editPopup);
  }
});


// AND CLOSE POPUP
editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  // NEW Data
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editPopup);
});


const editFunction = function() {
    return  openEditPopup(nameInput,profileTitle,jobInput,profileDescription,editPopup,editForm, submitButton);
}
// Button EDDTING
editButton.addEventListener('click', editFunction);


newCardPopup
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closePopup(newCardPopup);
  });


// Sending FORMS
form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addCard(placeName.value, link.value, placesList);
  form.reset();
  closePopup(newCardPopup);
  setSubmitButtonState(false, submitButton);
});

// VALIDNESS FORM
form.addEventListener("input", function () {
  const isValid = placeName.value.length > 0 && link.value.length > 0;
  setSubmitButtonState(isValid, submitButton);
});



// функция-обработчик события открытия модального окна для редактирования профиля
// BUTTON OPEN POPUP ANF EDDITING MODAL - EDDIT PROFILE
addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});



// функция открытия модального окна изображения карточки.


// Инициализация начальных 6 карточек
initialCards.forEach(function (card) {
  placesList.append(createCard(card));
});

// Начальное состояние кнопки
//setSubmitButtonState(false);    

// Open Image by Click
// Получаем элементы попапа изображения
const imagePopup = document.querySelector('.popup_type_image');

// Обработчик закрытия по крестику
imagePopup.querySelector('.popup__close').addEventListener('click', closeImagePopup);

// Обработчик закрытия по оверлею
imagePopup.addEventListener('click', (evt) => {
  if (evt.target === imagePopup) {
    closeImagePopup();
  }
});

// Функция обработки клика по изображению
function handleImageClick(link, name) {
  openImagePopup(link, name, name);
}

 })(); 