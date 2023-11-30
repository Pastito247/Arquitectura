function validateLogin() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username === 'ADMIN' && password === 'ADMIN') {
    alert('Inicio de sesión exitoso'); // Puedes redirigir a otra página aquí
  } else {
    openErrorModal();
  }
}

function openErrorModal() {
  document.getElementById('error-modal').style.display = 'flex';
}

function closeErrorModal() {
  document.getElementById('error-modal').style.display = 'none';
}
