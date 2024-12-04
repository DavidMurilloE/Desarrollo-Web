const d = document;
const $form = d.querySelector("#register-form");
const $nameInput = d.querySelector("#name");
const $nameError = d.querySelector("#name-error");
const $emailInput = d.querySelector("#email");
const $emailError = d.querySelector("#email-error");
const $passwordInput = d.querySelector("#password");
const $passwordError = d.querySelector("#password-error");
const $confirmPasswordInput = d.querySelector("#confirm-password");
const $confirmPasswordError = d.querySelector("#confirm-password-error");
const $successMessage = d.querySelector("#success-message");
const $errorsMessages = d.querySelectorAll(".error");

// Función que simula un loader de 5 segundos
function simulateLoader(callback) {
  $successMessage.innerText = "Cargando...";
  const $loader = d.querySelector("#loader");
  $loader.style.display = "block";  // Mostrar el loader

  setTimeout(() => {
    $loader.style.display = "none"; // Ocultar el loader
    callback();
  }, 5000);
}

// Función de Validación del Formulario
function validateForm(e) {
  // Reiniciar mensajes de error y éxito
  $errorsMessages.forEach((el) => {
    el.innerText = "";
  });
  $successMessage.innerText = "";

  let isValid = true;

  // Validar Nombre (solo letras y espacios)
  let namePattern = /^[A-Za-z\s]+$/;
  if ($nameInput.value.trim() === "") {
    $nameError.innerText = "El nombre es obligatorio";
    isValid = false;
  } else if (!namePattern.test($nameInput.value.trim())) {
    $nameError.innerText = "El nombre solo puede contener letras y espacios";
    isValid = false;
  }

  // Validar Email
  let emailPattern = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  if ($emailInput.value.trim() === "") {
    $emailError.innerText = "El email es obligatorio";
    isValid = false;
  } else if (!emailPattern.test($emailInput.value.trim())) {
    $emailError.innerText = "El formato del correo no es válido";
    isValid = false;
  }

  // Validar Password (mínimo 8 caracteres, un número, una letra mayúscula, una letra minúscula, y un carácter especial)
  let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  if ($passwordInput.value.trim() === "") {
    $passwordError.innerText = "La contraseña es obligatoria";
    isValid = false;
  } else if (!passwordPattern.test($passwordInput.value.trim())) {
    $passwordError.innerText = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial";
    isValid = false;
  }

  // Validar Confirmar Password
  if ($confirmPasswordInput.value.trim() !== $passwordInput.value.trim()) {
    $confirmPasswordError.innerText = "Las contraseñas no coinciden";
    isValid = false;
  }

  if (!isValid) {
    e.preventDefault();
  } else {
    e.preventDefault();
    simulateLoader(() => {
      $successMessage.innerText = "Formulario enviado exitosamente.";
      $form.reset();
    });
  }
}

$form.addEventListener("submit", validateForm);
