
  // Tu código aquí
async function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Si la respuesta no es "ok", muestra el modal de error
        document.getElementById('error-message').innerText = 'Error en la autenticación';
        openErrorModal();
        return;
      }
  
      // La respuesta es "ok", haz lo que necesites con los datos
      alert(data.message);
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  }



function openErrorModal() {
  document.getElementById('error-modal').style.display = 'flex';
}

function closeErrorModal() {
  document.getElementById('error-modal').style.display = 'none';
}