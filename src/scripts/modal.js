const form = document.forms['new-place']; // Получаем форму по имени
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const placeName = form.elements['place-name']; // Получаем элементы формы
const link = form.elements.link;

const editForm = document.forms['edit-profile'];
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const submitButton = form.querySelector('.popup__button');

// OPEN POPUP
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}


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

// CLOSE POPUP
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
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