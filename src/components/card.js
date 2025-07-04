// FUNCTION CREATE CARD
function createCard(cardData, cardCallbacks) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage =cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElement.querySelector(".card__title").textContent = cardData.name;
  const likesOnCard = cardElement.querySelector(".likes__on__card");
  likesOnCard.textContent = cardData.likes.length;

  const likeButton = cardElement.querySelector(".card__like-button");

  const dataContainer = cardElement.querySelector(".places__item");

  if (dataContainer.dataset.cardId === undefined) {
    dataContainer.dataset.cardId = cardData.id;
  }
  const deleteButton = cardElement.querySelector(".card__delete-button");
  
  const canBeDeleted = cardData.ownerID === cardData._myId;
  if (canBeDeleted) {
    deleteButton.addEventListener("click", (evt) => {
      cardCallbacks.onDelete(
        dataContainer.dataset.cardId,
        evt.target.closest(".card")
      );
    });
  } else {
    deleteButton.style.visibility = "hidden";
  }

  //внутри метода creatCard
  if (cardData.isLiked) {
    likeButton.classList.toggle("card__like-button_is-active");
  }


  // LIKE CARD
  likeButton.addEventListener("click", (evt) => {
    const likeActive = evt.target.classList.contains("card__like-button_is-active");
    cardCallbacks.onLike(dataContainer.dataset.cardId,likesOnCard, likeActive, evt.target);
  });


  cardImage.addEventListener("click",()=>{
    cardCallbacks.onClick(
      {
        link:cardImage.src,
        name:cardImage.alt 
      }
    )
  })

  return cardElement;
}

export { createCard };
