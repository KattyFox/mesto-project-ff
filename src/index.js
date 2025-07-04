import "./pages/index.css";
import "./components/card.js";
import "./components/modal.js";
import "./components/validation.js";

import { createCard } from "./components/card.js";
import {
  closePopup,
  openPopup,
} from "./components/modal.js";
import { initialCards } from "./scripts/cards.js";

import { enableValidation, clearValidation, setSubmitButtonText  } from "./components/validation.js";

import * as api from "./components/api.js";

(function () {
  let _myId = "";

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
    myID,
    cardId,
    isLikesByUs,
    ownerID,
  ) {
    const card = createCard(
      {
        name: nameValue,
        link: linkValue,
        likes: cardLikes,
        _myId: myID,
        id: cardId,
        isLiked: isLikesByUs,
        ownerID,
      },
      { onDelete: onDeleteCard, onLike: onLikeCard,
        onClick:onClickCard }
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

  async function onLikeCard(cardId, likesOnCard, isLikeActive, target ) {
    try {
    let json ;
      if(isLikeActive){
        json = await api.unLike(cardId);
      }else{
        json = await api.like(cardId);
      }
      
      likesOnCard.textContent = json.likes.length;
      target.classList.toggle("card__like-button_is-active");
    } catch {
      return;
    }
  }

   function onClickCard(cardData) {
      // Заполняем попап данными
      popupImage.src = cardData.link;
      popupImage.alt = cardData.name;
      popupCaption.textContent = cardData.name;

      openPopup(imagePopup);
  }

  // Обработчик submit
  editForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    try{
      setSubmitButtonText(true, profileSubmitButton);
      const json = await api.updProfileData(nameInput.value, jobInput.value);
      profileTitle.textContent = json.name;
      profileDescription.textContent = json.about;
    }catch {
    }
    finally {
    
      
      setSubmitButtonText(false, profileSubmitButton);
      closePopup(editPopup);
    }


  });

  // редактировать профиль
  editButton.addEventListener("click", () => {
    // CURRENT data of progile
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    // ВАлидация кнопки добавления новой карточки
    clearValidation(editPopup,validationConfig);
    openPopup(editPopup);
  });

  editAvatar.addEventListener("click", () => {
    editAvatarInput.value = "";
    const isValid = editAvatarInput.checkValidity();
    
    openPopup(avatarEditPopup);
  });



  // Отправка формы
  avatarEditPopup.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    const avatarUrl = editAvatarInput.value;
    profileAvatar.style.backgroundImage = `url(${avatarUrl})`;

    
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
  });

  // Отправка формы
  newCardForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    const name = placeName.value;
    const link = newCardImageLink.value;
    
    setSubmitButtonText(true, newCardSubmitButton);

    try {
        const json = await api.uploadCard(name, link);
        addCard(
        json.name,
        json.link,
        placesList,
        json.likes,
        _myId,
        json._id,
        json.likes.some((x) => x._id === _myId),
        json.owner._id
        );
    } 
    catch {
       return;
    } 
    finally {
      newCardForm.reset();
      closePopup(newCardPopup);
    }
  });

  async function loadPage() {
    async function updateMe() {
      try{
        const json = await api.getMe();

        profileTitle.textContent = json["name"];
        profileDescription.textContent = json["about"];
        profileAvatar.style.backgroundImage = `url(${json[`avatar`]})`;
        _myId = json["_id"];

      } catch{
        alert("Ошибка HTTP: " + response.status);
      }
    }

    async function getCards() {
      try{
        const json = await api.getCards();
        json.forEach((element) => {
        addCard(
        element.name,
        element.link,
        placesList,
        element.likes,
        _myId,
        element._id,
        element.likes.some((x) => x._id === _myId),
        element.owner._id,
        );});
      } catch (error) {
        console.error(error);
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
