const token = "ca9c73cd-774d-4dee-9109-08215140258b";
const baseUrl = "https://nomoreparties.co/v1/wff-cohort-41";
const meUrl = "/users/me";
const cards = "/cards";

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

export{getMe, getCards}

