const token = "ca9c73cd-774d-4dee-9109-08215140258b";
const baseUrl = "https://nomoreparties.co/v1/wff-cohort-41";
const meUrl = "/users/me";
const cards = "/cards";
const likes = "/likes";

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Response status: ${res.status}`);
}

async function getMe() {
 return fetch(baseUrl + meUrl, {
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
}

async function getCards() {
  return fetch(baseUrl + cards, {
    headers: {
      authorization: token,
    },
    }).then(handleResponse);
}

async function updProfileData(newName, newAbout) {
  return fetch(baseUrl + meUrl, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
   }).then(handleResponse);
}

async function uploadCard(imageName, imageLink) {
  return fetch(baseUrl + cards, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: imageName,
      link: imageLink,
    }),
   }).then(handleResponse);
}

async function deleteCard(cardId) {
  fetch(baseUrl + cards + "/" + cardId, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
   }).then(handleResponse);
}

async function like(cardId) {
  return fetch(baseUrl + cards + likes + "/" + cardId, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
   }).then(handleResponse);
}

async function unLike(cardId) {
  return fetch(baseUrl + cards + likes + "/" + cardId, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    }).then(handleResponse);
}

async function changeAvatar(avatarLink) {
  return fetch(baseUrl + meUrl + "/avatar", {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
   }).then(handleResponse);
}

export {
  getMe,
  getCards,
  updProfileData,
  uploadCard,
  deleteCard,
  like,
  unLike,
  changeAvatar,
};
