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




export { closePopup, openPopup };
