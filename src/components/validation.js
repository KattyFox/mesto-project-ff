const formPopupForm = document.querySelector('.popup__form');
const popupInput = formPopupForm.querySelector('.popup__input');
const popupError = formPopupForm.querySelector(`.${popupInput.id}-error`);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове



const showInputError = (formElement, inputElement, errorMessage,settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement,settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,settings);
  } else {
    hideInputError(formElement, inputElement,settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const s = settings;
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, s);
    });
  });
};


const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    setEventListeners(formElement,settings);
  });

};

const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement);
    inputElement.setCustomValidity(''); // Сбрасываем кастомные сообщения
  });

  
};

export { enableValidation, clearValidation };


