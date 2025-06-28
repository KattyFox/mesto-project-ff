function getOpenedPopup() {
  return document.querySelector('.popup_is-opened');
}

function checkClosePopup(evt){
  const popup = getOpenedPopup();
  if (evt.key === 'Escape' || ( evt.target.classList.contains('popup__close')) || evt.target === popup  ) {
    if (popup) {
      closePopup(popup)
    };
  }
}

// OPEN POPUP
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown', checkClosePopup);
  document.addEventListener('click', checkClosePopup);
}

// CLOSE POPUP
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', checkClosePopup);
  document.removeEventListener('click', checkClosePopup);
}



// VALID BUTTON
function setSubmitButtonState(isFormValid, submitButton) {
  if (isFormValid) {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove("popup__button_disabled");
  } else {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add("popup__button_disabled");
  }
}

// VALID BUTTON
function setSubmitButtonText(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение ...';
  } else {
     submitButton.textContent = 'Сохранить';
  }
}


export { setSubmitButtonState, setSubmitButtonText, closePopup, openPopup };
