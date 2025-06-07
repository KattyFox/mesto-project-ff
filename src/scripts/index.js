// поиск DOM-элементов на странице 
const placesList = document.querySelector(".places__list");

const editForm = document.forms['edit-profile'];
const editPopup = document.querySelector('.popup_type_edit');

const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const form = document.forms['new-place']; // Получаем форму по имени
const placeName = form.elements['place-name']; // Получаем элементы формы
const link = form.elements.link;
const submitButton = form.querySelector('.popup__button');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const newCardPopup = document.querySelector('.popup_type_new-card');




// навешивание на них обработчиков событий

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
editButton.addEventListener('click', openEditPopup);
editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  // NEW Data
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editPopup);
});

// Click Button EDDTING
editButton.addEventListener('click', openEditPopup);

newCardPopup
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closePopup(newCardPopup);
  });


// обработчики отправки форм
form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addCard(placeName.value, link.value);
  form.reset();
  closePopup(newCardPopup);
  setSubmitButtonState(false);
});

// VALIDNESS FORM
form.addEventListener("input", function () {
  const isValid = placeName.value.length > 0 && link.value.length > 0;
  setSubmitButtonState(isValid);
});



// функция-обработчик события открытия модального окна для редактирования профиля
// BUTTON OPEN POPUP
addButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});



// функция открытия модального окна изображения карточки.


// отображение шести карточек при открытии страницы
// Инициализация начальных карточек
initialCards.forEach(function (card) {
  placesList.append(createCard(card));
});

// Начальное состояние кнопки
setSubmitButtonState(false);    

// NEW: Получаем элементы попапа изображения
const imagePopup = document.querySelector('.popup_type_image');

// NEW: Обработчик закрытия по крестику
imagePopup.querySelector('.popup__close').addEventListener('click', closeImagePopup);

// NEW: Обработчик закрытия по оверлею
imagePopup.addEventListener('click', (evt) => {
  if (evt.target === imagePopup) {
    closeImagePopup();
  }
});

// NEW: Функция обработки клика по изображению
function handleImageClick(link, name) {
  openImagePopup(link, name, name);
}

