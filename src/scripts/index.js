//  DOM elements
const placesList = document.querySelector('.places__list');

const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');



// SEND FORM by SUBMIT
form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  addCard(placeName.value, link.value);
  form.reset();
  closePopup(newCardPopup);
  setSubmitButtonState(false);
});



// Инициализация начальных карточек
initialCards.forEach(function(card) {
  placesList.append(createCard(card));
});

// Начальное состояние кнопки
setSubmitButtonState(false);
