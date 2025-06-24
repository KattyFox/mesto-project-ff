const token = "ca9c73cd-774d-4dee-9109-08215140258b";
const baseUrl = "https://nomoreparties.co/v1/wff-cohort-41";
const meUrl = "/users/me";
const cards = "/cards";
const likes ="/likes"

async function getMe() {
 return fetch(baseUrl+meUrl, {
    headers: {
      authorization: "ca9c73cd-774d-4dee-9109-08215140258b",
    },
  });
}

async function getCards() {
 return fetch(baseUrl+cards, {
    headers: {
      authorization: "ca9c73cd-774d-4dee-9109-08215140258b",
    },
  });
}

async function updProfileData (newName, newAbout) {
  fetch(baseUrl+ meUrl, {
  method: 'PATCH',
  headers: {
    authorization: 'ca9c73cd-774d-4dee-9109-08215140258b',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: newName,
    about: newAbout
  })
});

}

async function uploadCard (imageName, imageLink) {
 return fetch(baseUrl+cards, {
  method: 'POST',
  headers: {
    authorization: 'ca9c73cd-774d-4dee-9109-08215140258b',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: imageName,
    link: imageLink
  })
});
}

async function deleteCard (cardId) {
 return fetch(baseUrl+cards+"/"+cardId, {
  method: 'DELETE',
  headers: {
    authorization: 'ca9c73cd-774d-4dee-9109-08215140258b',
    'Content-Type': 'application/json'
  }
});
}


//PUT https://nomoreparties.co/v1/cohortId/cards/likes/cardId 
async function like(cardId) {
  return fetch(baseUrl+cards+likes+"/"+cardId, {
  method: 'PUT',
  headers: {
    authorization: 'ca9c73cd-774d-4dee-9109-08215140258b',
    'Content-Type': 'application/json'
  }
});
}

export{getMe, getCards, updProfileData,uploadCard,deleteCard, like}

