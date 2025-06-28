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
  if (inputElement.validity.patternMismatch) {
    const message = inputElement.getAttribute('data-error-message');
    if(message !== undefined)
      inputElement.setCustomValidity(message);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
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

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  setSubmitButtonState(false, buttonElement, validationConfig);
  
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement,validationConfig);
    inputElement.setCustomValidity(''); // Сбрасываем кастомные сообщения
    inputElement.value='';
  });
};

const enableExtraValidation =  (validationConfig,settings) => {
  settings.avatarEditPopup.addEventListener("input", () => {
    const isValid = settings.editAvatarInput.checkValidity();
    setSubmitButtonState(isValid, settings.editAvatarSubmit,validationConfig);
  });

  // Валидация формы добавления новок карточки
  settings.newCardForm.addEventListener("input", function () {
    const isValid =
      settings.placeName.checkValidity() && settings.newCardImageLink.checkValidity();
    setSubmitButtonState(isValid, settings.newCardSubmitButton,validationConfig);
  });

  // Валидация формы редактирования профиля
  settings.editPopup.addEventListener("input", function () {
    const isValid =
      settings.editNameProfile.checkValidity() && settings.editDescriptionProfile.checkValidity();
    setSubmitButtonState(isValid, settings.submitProfileButton,validationConfig);
  });
}

// VALID BUTTON
const setSubmitButtonState = (isFormValid, submitButton, validationConfig) =>{
  if (isFormValid) {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove( validationConfig.inactiveButtonClass);
  } else {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add(validationConfig.inactiveButtonClass);
  }
}

// VALID BUTTON
const setSubmitButtonText = (isLoading, submitButton) => {
  if (isLoading) {
    submitButton.textContent = 'Сохранение ...';
  } else {
     submitButton.textContent = 'Сохранить';
  }
}
export { enableValidation, clearValidation,enableExtraValidation, setSubmitButtonState,setSubmitButtonText  };


