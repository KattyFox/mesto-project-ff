
function createCard(cardData, deleteCallback){
  //clone card template
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  //detected card Elements
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
  
  // fill the cards Data
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
  
    deleteButton.addEventListener('click', deleteCallback);

  return cardElement;
  }
  
  
  const placesList = document.querySelector('.places__list');
  
 //DOM Element
  const newCardPopup = document.querySelector('.popup_type_new-card');
  const newCardForm = newCardPopup.querySelector('.popup__form');
  const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
  const linkInput = newCardForm.querySelector('.popup__input_type_url');
 
  //delete function
  function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

 initialCards.forEach(card => {
    placesList.append(createCard(card, deleteCard));
  });


  function openPopup(popup) {
  popup.style.display = 'flex';
  popup.style.visibility = 'visible';
  popup.style.opacity = '1';
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.style.display = 'flex';
  popup.style.visibility = 'hidden';
  popup.style.opacity = '0';
}

// Находим кнопку добавления
const profileAddButton = document.querySelector('.profile__add-button');

// Вешаем обработчик на кнопку
profileAddButton.addEventListener('click', () => {
  openPopup(newCardPopup); // newCardPopup у тебя уже определён
});


document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});