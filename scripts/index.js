function createCard(cardData, deleteCallback) {
  //clone card template
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  //detected card Elements
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // cards Data
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", deleteCallback);

  return cardElement;
}

const placesList = document.querySelector(".places__list");


//delete function
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard));
});

