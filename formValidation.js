const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const checkboxEl = document.querySelector('#checkbox');

const form = document.querySelector('#form');

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
        fn.apply(null, args)
    }, delay);
  };
};

form.addEventListener('submit', function (e) {
  // prevent the form from submitting
  e.preventDefault();
  
  // validate forms
  let isUsernameValid = checkUsername(),
      isEmailValid = checkEmail(),
      isPhoneValid = checkPhone(),
      isCheckboxValid = checkCheckbox();
  
  let isFormValid = isUsernameValid &&
      isEmailValid &&
      isPhoneValid &&
      isCheckboxValid;
  
  // submit to the server if the form is valid
  if (isFormValid) {
  
  }
  
});

form.addEventListener('input', debounce(function (e) {
  switch (e.target.id) {
    case 'username':
      checkUsername();
      break;
    case 'email':
      checkEmail();
      break;
    case 'phone':
      checkPhone();
      break;
    case 'checkbox':
      checkCheckbox();
      break;
  }
}));

const showError = (input) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove('success');
  formField.classList.add('error');

  // show the error message
  const error = formField.querySelector('small');
  // error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove('error');
  formField.classList.add('success');

  // hide the error message
  const error = formField.querySelector('small');
  error.textContent = '';
}

const checkUsername = () => {
  let valid = false;
  const min = 3,
      max = 25;
  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
      showError(usernameEl);
  } else {
      showSuccess(usernameEl);
      valid = true;
  }
  return valid;
}

const checkPhone = () => {
  let valid = false;
  const phoneMin = 10;
  const phone = phoneEl.value.trim();
  if (!isRequired(phone)) {
    showError(phoneEl);
  } else {
    showSuccess(phoneEl);
    valid = true;
  }
  return valid;
}

const checkEmail = () => {
  const formFieldEmail = emailEl.parentElement;
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
      showError(emailEl);
  } else if (!isEmailValid(email)) {
      showError(emailEl);
      formFieldEmail.classList.add('error-email');
  } else {
      showSuccess(emailEl);
      valid = true;
      formFieldEmail.classList.remove('error-email');
  }
  return valid;
}

const checkCheckbox = () => {
  let valid = false;
  const checkbox = checkboxEl.value.trim();

  if (!isRequired(checkbox)) {
    showError(checkboxEl);
  } else if (!checkboxEl.checked) {
      showError(checkboxEl); 
  } else {
      showSuccess(checkboxEl);
      valid = true;
  }
  return valid;
}
