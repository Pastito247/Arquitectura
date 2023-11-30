
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
  
      window.location.href = 'crearCita.html';
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

async function guardarDatos() {
  const rut = document.getElementById('rut').value;
  const nombreCompleto = document.getElementById('nombreCompleto').value;
  const nombreMedico = document.getElementById('nombreMedico').value;
  const fechaAtencion = document.getElementById('fechaAtencion').value;
  const telefono = document.getElementById('telefono').value;
  const direccion = document.getElementById('direccion').value;

  try {
    const response = await fetch('http://localhost:4000/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut,
        nombreCompleto,
        nombreMedico,
        fechaAtencion,
        telefono,
        direccion,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
    } else {
      throw new Error(`Error al guardar datos: ${data.message}`);
    }
  } catch (error) {
    console.error('Error de red:', error.message);
  }
}

async function obtenerDatos() {
  try {
    const response = await fetch('http://localhost:4000/get-all');

    if (response.ok) {
      const data = await response.json();
      mostrarDatos(data.data);
    } else {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error de red:', error.message);
  }
}

function mostrarDatos(datos) {
  const listaDatos = document.getElementById('lista-datos');

  // Limpia la lista antes de agregar nuevos elementos
  listaDatos.innerHTML = '';

  // Crea elementos HTML para cada dato y agrégales a la lista
  datos.forEach(dato => {
    const listItem = document.createElement('li');
    listItem.textContent = `RUT: ${dato.rut}, Nombre Completo: ${dato.nombreCompleto}, Médico: ${dato.nombreMedico}, Fecha: ${dato.fechaAtencion}, Teléfono: ${dato.telefono}, Dirección: ${dato.direccion}`;
    listaDatos.appendChild(listItem);
  });
}