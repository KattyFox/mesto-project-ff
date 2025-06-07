





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

// FUNC OPEN ADITING
function openEditPopup() {
  // CURRENT data of progile
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
  // VALIDATION FORM
  setSubmitButtonState(editForm.querySelector('.popup__button'), true);
  
  openPopup(editPopup);
}


// NEW: Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt, captionText) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = captionText;
  
  openPopup(imagePopup);
}

// NEW: Функция закрытия попапа изображения
function closeImagePopup() {
  const imagePopup = document.querySelector('.popup_type_image');
  closePopup(imagePopup);
}