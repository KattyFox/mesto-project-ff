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

const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const placeNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = newCardForm.querySelector(".popup__input_type_url");

//delete function
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard));
});

function openPopup(popup) {
  popup.style.display = "flex";
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
}

function closePopup(popup) {
  popup.style.display = "flex";
  popup.style.visibility = "hidden";
  popup.style.opacity = "0";
}

//adding new card to the page

const profileAddButton = document.querySelector(".profile__add-button");

profileAddButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// adding function
function AddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  placesList.prepend(createCard(newCardData, deleteCard));
  newCardForm.reset();
  closePopup(newCardPopup);
}

newCardForm.addEventListener("submit", AddCardSubmit);
