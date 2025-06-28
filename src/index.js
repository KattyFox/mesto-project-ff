import "./pages/index.css";
import "./components/card.js";
import "./components/modal.js";
import "./components/validation.js";

import { createCard } from "./components/card.js";
import {
  setSubmitButtonState,
  setSubmitButtonText,
  closePopup,
  openPopup,
} from "./components/modal.js";
import { initialCards } from "./scripts/cards.js";

import { enableValidation, clearValidation } from "./components/validation.js";

import * as api from "./components/api.js";

(function () {
  // поиск DOM-элементов на странице
  const placesList = document.querySelector(".places__list");

  const deletePopup = document.querySelector(".popup__deletable_edit");
  const deleteButtonSure = deletePopup.querySelector(".popup__button");

  // Обновление профиля
  const editForm = document.forms["edit-profile"];
  const nameInput = editForm.elements["my-name"];
  const jobInput = editForm.elements.description;
  const profileTitle = document.querySelector(".profile__title");
  const profileAvatar = document.querySelector(".profile__image");
  const profileDescription = document.querySelector(".profile__description");
  const profileSubmitButton = editForm.querySelector(".popup__button");

  // NEW CARD
  const addNewCardButton = document.querySelector(".profile__add-button");
  const newCardPopup = document.querySelector(".popup_type_new-card");
  const newCardForm = document.forms["new-place"]; // getting form by name
  const placeName = newCardForm.elements["place-name"]; // getting form elements
  const newCardImageLink = newCardForm.elements.link;
  const newCardSubmitButton = newCardForm.querySelector(".popup__button");

  // EDIT PROFILE
  const editPopup = document.querySelector(".popup_type_edit");
  const editButton = document.querySelector(".profile__edit-button");
  const submitProfileButton = editPopup.querySelector(".popup__button");
  const editNameProfile = editPopup.querySelector(".popup__input_type_name");
  const editDescriptionProfile = editPopup.querySelector(
    ".popup__input_type_description"
  );

  // EDIT AVATAR
  const avatarEditPopup = document.querySelector(".popup_avatar_edit");
  const editAvatar = document.querySelector(".avatar__edit-button");
  const editAvatarInput = avatarEditPopup.querySelector(
    ".popup__input_type_url"
  );
  const editAvatarSubmit = avatarEditPopup.querySelector(".popup__button");

  const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  // Попапы и их элементы + проверка
  const imagePopup = document.querySelector(".popup_type_image");
  let popupImage, popupCaption;
  if (imagePopup) {
    popupImage = imagePopup.querySelector(".popup__image");
    popupCaption = imagePopup.querySelector(".popup__caption");
  }

  // FUNCTION ADDING CARD
  function addCard(
    nameValue,
    linkValue,
    placesList,
    cardLikes,
    cardCanBeDeleted,
    cardId,
    isLikesByUs
  ) {
    const card = createCard(
      {
        name: nameValue,
        link: linkValue,
        likes: cardLikes,
        canBeDeleted: cardCanBeDeleted,
        id: cardId,
        isLiked: isLikesByUs,
      },
      { onDelete: onDeleteCard, onLike: onLikeCard, onUnLike: onUnLikeCard }
    );
    placesList.prepend(card);
  }

  function onDeleteCard(cardId, cardElementToRemove) {
    openPopup(deletePopup);
    deleteButtonSure.addEventListener("click", async () => {
      try {
        await api.deleteCard(cardId);
        cardElementToRemove.remove();
      } catch {
        return;
      } finally {
        closePopup(deletePopup);
      }
    });
  }

  async function onLikeCard(cardId, likesOnCard) {
    try {
      const json = await api.like(cardId);
      likesOnCard.innerHTML = json.likes.length;
    } catch {
      return;
    }
  }

  async function onUnLikeCard(cardId, likesOnCard) {
    try {
      const json = await api.unLike(cardId);
      likesOnCard.innerHTML = json.likes.length;
    } catch {
      return;
    }
  }

  // Обработчик submit
  editForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    // NEW Data
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    setSubmitButtonState(false, profileSubmitButton);
    setSubmitButtonText(true, profileSubmitButton);

    api.updProfileData(nameInput.value, jobInput.value).finally(() => {
      setSubmitButtonText(false, profileSubmitButton);
      closePopup(editPopup);
    });
  });

  // редактировать профиль
  editButton.addEventListener("click", () => {
    // CURRENT data of progile
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    // ВАлидация кнопки добавления новой карточки
    setSubmitButtonState(true, submitProfileButton);
    openPopup(editPopup);
  });

  editAvatar.addEventListener("click", () => {
    editAvatarInput.value = "";
    const isValid = editAvatarInput.checkValidity();
    setSubmitButtonState(false, editAvatarSubmit);
    openPopup(avatarEditPopup);
  });

  avatarEditPopup.addEventListener("input", () => {
    const isValid = editAvatarInput.checkValidity();
    setSubmitButtonState(isValid, editAvatarSubmit);
  });

  // Отправка формы
  avatarEditPopup.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    const avatarUrl = editAvatarInput.value;
    profileAvatar.style.backgroundImage = `url(${avatarUrl})`;

    setSubmitButtonState(false, editAvatarSubmit);
    setSubmitButtonText(true, editAvatarSubmit);

    try {
      await api.changeAvatar(avatarUrl);
    } catch {
      return;
    } finally{
        setSubmitButtonText(false, editAvatarSubmit);
        closePopup(avatarEditPopup);
    }
  });

  newCardPopup
    .querySelector(".popup__close")
    .addEventListener("click", function () {
      closePopup(newCardPopup);
    });

  // функция-обработчик для открытия попапа
  addNewCardButton.addEventListener("click", function () {
    openPopup(newCardPopup);
    clearValidation(newCardPopup, validationConfig);

    const isValid =
      placeName.checkValidity() && newCardImageLink.checkValidity();
    setSubmitButtonState(isValid, newCardSubmitButton);
  });

  // Отправка формы
  newCardForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    const name = placeName.value;
    const link = newCardImageLink.value;
    //addCard(name, link, placesList);

    setSubmitButtonText(true, newCardSubmitButton);

    try {
    await api.uploadCard(name, link);
    } 
    catch {
       return;
    } 
    finally {
      newCardForm.reset();
      closePopup(newCardPopup);
      setSubmitButtonState(false, newCardSubmitButton);
    }
  });

  // Валидация формы добавления новок карточки
  newCardForm.addEventListener("input", function () {
    const isValid =
      placeName.checkValidity() && newCardImageLink.checkValidity();
    setSubmitButtonState(isValid, newCardSubmitButton);
  });

  // Валидация формы редактирования профиля
  editPopup.addEventListener("input", function () {
    const isValid =
      editNameProfile.checkValidity() && editDescriptionProfile.checkValidity();
    setSubmitButtonState(isValid, submitProfileButton);
  });

  // Добавляем наши 6 начальных карт
  //initialCards.forEach((cardData) => {
  //  const cardElement = createCard(cardData);
  //  placesList.append(cardElement);
  //});

  // Обработчик на весь список карточек /"делегирование события"
  placesList.addEventListener("click", (evt) => {
    // Проверка клика на картинке
    if (evt.target.classList.contains("card__image")) {
      const card = evt.target.closest(".card");
      const cardTitle = card.querySelector(".card__title");

      const cardData = {
        link: evt.target.src,
        name: evt.target.alt || cardTitle.textContent,
      };

      // Заполняем попап данными
      popupImage.src = cardData.link;
      popupImage.alt = cardData.name;
      popupCaption.textContent = cardData.name;

      openPopup(imagePopup);
    }
  });

  async function loadPage() {
    let _myId = "";

    async function updateMe() {
      try{
        const json = await api.getMe();

        profileTitle.innerHTML = json["name"];
        profileDescription.innerHTML = json["about"];
        profileAvatar.style.backgroundImage = `url(${json[`avatar`]})`;
        _myId = json["_id"];

      } catch{
        alert("Ошибка HTTP: " + response.status);
      }
    }

    async function getCards() {
      try{
        const json = await api.getCards();
        // let json = await response.json();
        json.forEach((element) => {
        addCard(
        element.name,
        element.link,
        placesList,
        element.likes,
        element.owner._id === _myId,
        element._id,
        element.likes.some((x) => x._id === _myId)
        );});

      } catch{
        alert("Ошибка HTTP:" + response.status);
      }
      finally{
      }
    }

    enableValidation(validationConfig);
    await updateMe();
    await getCards();
  }

  // включение валидации вызовом enableValidation
  // все настройки передаются при вызове

  loadPage();
})();
