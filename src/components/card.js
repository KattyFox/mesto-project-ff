
import {openPopup} from "../components/modal.js"

// FUNCTION CREATE CARD
function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

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

 // OPEN IMAGE BY CLICK
  cardImage.addEventListener('click', () => {
    //openImagePopup(cardData.link, cardData.name, cardData.name);
    const imagePopup = document.querySelector(".popup_type_image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openPopup(imagePopup);
  });
  

  return cardElement;
}



// FUNCTION ADDING CARD
function addCard(nameValue, linkValue, placesList) {
  placesList.prepend(createCard({
    name: nameValue,
    link: linkValue
  }));
}

export {createCard, addCard};