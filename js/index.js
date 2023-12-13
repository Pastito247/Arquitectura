
  // Tu código aquí
function validateLogin() {
    const username = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if(username === 'Secretaria' && pass === '123'){
      window.location.href = 'lobby.html';
    }else if(username === 'Medico' && pass === '1234'){
      window.location.href = 'medico.html';
    }else if (username === 'Paciente' && pass === '12345'){
      window.location.href = 'paciente.html';
    }else{
      openErrorModal();
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
window.onload = function () {
  // Supongamos que tienes un array de datos para mostrar
  obtenerDatos();
};
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

async function procesarPago() {
  const consultaId = document.getElementById('consultaIdPago').value;
  const monto = document.getElementById('montoPago').value;
  const tarjeta = document.getElementById('tarjeta').value;
  const nombreTitular = document.getElementById('nombreTitular').value;
  const fechaExpiracion = document.getElementById('fechaExpiracion').value;
  const cvv = document.getElementById('cvv').value;

  try {
    const response = await fetch('http://localhost:5000/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consultaId,
        monto,
        tarjeta,
        nombreTitular,
        fechaExpiracion,
        cvv,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      guardarDatos();
      window.location.href = 'lobby.html';
    } else {
      throw new Error(`Error al procesar el pago: ${data.message}`);
    }
  } catch (error) {
    console.error('Error de red:', error.message);
  }
}

