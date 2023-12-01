// listado-citas.js

document.addEventListener('DOMContentLoaded', () => {
    cargarCitas();
});

function cargarCitas() {
    const citasContainer = document.getElementById('citas-container');
    citasContainer.innerHTML = '';

    fetch('http://localhost:4000/get-all')
        .then(response => response.json())
        .then(data => {
            const citas = data.data.slice(-5);

            citas.forEach(cita => {
                const card = document.createElement('div');
                card.classList.add('card'); // Agregar la clase 'card'
                card.innerHTML = `
                    <h3>${cita.nombreCompleto}</h3>
                    <p>RUT: ${cita.rut}</p>
                    <p>Médico: ${cita.nombreMedico}</p>
                    <p>Fecha: ${cita.fechaAtencion}</p>
                    <p>Teléfono: ${cita.telefono}</p>
                    <p>Dirección: ${cita.direccion}</p>
                `;
                citasContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar citas:', error));
}


function filtrarPorFecha() {
    const fechaFiltro = document.getElementById('fechaFiltro').value;


    const citasFiltradas = dataStore.filter(cita => cita.fechaAtencion === fechaFiltro);

  
    const citasContainer = document.getElementById('citas-container');
    citasContainer.innerHTML = '';

    citasFiltradas.forEach(cita => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${cita.nombreCompleto}</h3>
            <p>RUT: ${cita.rut}</p>
            <p>Médico: ${cita.nombreMedico}</p>
            <p>Fecha: ${cita.fechaAtencion}</p>
            <p>Teléfono: ${cita.telefono}</p>
            <p>Dirección: ${cita.direccion}</p>
        `;
        citasContainer.appendChild(card);
    });
}
