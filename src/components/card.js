
// FUNCTION CREATE CARD
function createCard(cardData) {
  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  const likesOnCard =cardElement.querySelector('.likes__on__card');
  likesOnCard.innerHTML = cardData.likes.length;

  const likeButton = cardElement.querySelector('.card__like-button');

  const dataContainer = cardElement.querySelector('.places__item');

 if (dataContainer.dataset.cardId === undefined){
  dataContainer.dataset.cardId = cardData.id;
 }
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if(cardData.canBeDeleted){
      // DELETE CARD
      deleteButton.addEventListener('click', (evt) => {
      cardData.onDelete(dataContainer.dataset.cardId,evt.target.closest('.card'));
    });
  } else {
    deleteButton.style.visibility = 'hidden';
  }

  // LIKE CARD
  likeButton.addEventListener('click', (evt) => {
    const likeCounter = likesOnCard;

    if(evt.target.classList.contains('card__like-button_is-active')){
      cardData.onUnLike(dataContainer.dataset.cardId,likeCounter);
    } else {
      cardData.onLike(dataContainer.dataset.cardId,likeCounter);
    }

    evt.target.classList.toggle('card__like-button_is-active');
  });

  if (cardData.isLiked){
    likeButton.classList.toggle('card__like-button_is-active');
  }

  return cardElement;
}


export {createCard};