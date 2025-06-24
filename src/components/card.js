
// FUNCTION CREATE CARD
function createCard(cardData) {
  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.likes__on__card').innerHTML = cardData.likes.length;

  const dataContainer = cardElement.querySelector('.places__item');

 if (dataContainer.dataset.cardId === undefined){
  dataContainer.dataset.cardId = cardData.id;
 }
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if(cardData.canBeDeleted){
      // DELETE CARD
      deleteButton.addEventListener('click', (evt) => {
      evt.target.closest('.card').remove();
      cardData.onDelete(dataContainer.dataset.cardId);
    });
  } else {
    deleteButton.style.visibility = 'hidden';
  }

  // LIKE CARD
  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  return cardElement;
}


export {createCard};