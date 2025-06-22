const formPopupForm = document.querySelector('.popup__form');
const popupInput = formPopupForm.querySelector('.popup__input');
const popupError = formPopupForm.querySelector(`.${popupInput.id}-error`);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове



const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};






const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    setEventListeners(formElement);
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


