// OPEN POPUP
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

// CLOSE POPUP
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
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


export { setSubmitButtonState,  closePopup, openPopup };
