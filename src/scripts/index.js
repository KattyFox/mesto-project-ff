//  DOM elements
const placesList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const form = document.forms['new-place']; // Получаем форму по имени
const placeName = form.elements['place-name']; // Получаем элементы формы
const link = form.elements.link;
const submitButton = form.querySelector('.popup__button');

// DOM elements ADDING PROFILE
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = document.forms['edit-profile'];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// FUNCTION CREATE CARD
function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // DELETE CARD
  cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  // LIKE CARD
  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  return cardElement;
}

// FUNCTION ADDING CARD
function addCard(nameValue, linkValue) {
  placesList.prepend(createCard({
    name: nameValue,
    link: linkValue
  }));
}

// OPEN POPUP
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

// CLOSE POPUP
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

// SEND FORM by SUBMIT
form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  addCard(placeName.value, link.value);
  form.reset();
  closePopup(newCardPopup);
  setSubmitButtonState(false);
});

// VALID BUTTON
function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__button_disabled');
  } else {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__button_disabled');
  }
}

// VALIDNESS FORM
form.addEventListener('input', function() {
  const isValid = placeName.value.length > 0 && link.value.length > 0;
  setSubmitButtonState(isValid);
});

// BUTTON OPEN POPUP
addButton.addEventListener('click', function() {
  openPopup(newCardPopup);
});

// AND CLOSE POPUP
newCardPopup.querySelector('.popup__close').addEventListener('click', function() {
  closePopup(newCardPopup);
});

// CLOSE by OVERLAY
newCardPopup.addEventListener('click', function(evt) {
  if (evt.target === newCardPopup) {
    closePopup(newCardPopup);
  }
});

// Инициализация начальных карточек
initialCards.forEach(function(card) {
  placesList.append(createCard(card));
});

// Начальное состояние кнопки
setSubmitButtonState(false);

// FUNC OPEN ADITING
function openEditPopup() {
  // CURRENT data of progile
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
  // VALIDATION FORM
  setSubmitButtonState(editForm.querySelector('.popup__button'), true);
  
  openPopup(editPopup);
}

// EDDITING FORM
editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  
  // NEW Data
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  
  closePopup(editPopup);
});

// Click Button EDDTING
editButton.addEventListener('click', openEditPopup);

// CLOSE by "X" and Overlay
editPopup.querySelector('.popup__close').addEventListener('click', () => closePopup(editPopup));
editPopup.addEventListener('click', (evt) => {
  if (evt.target === editPopup) {
    closePopup(editPopup);
  }
});