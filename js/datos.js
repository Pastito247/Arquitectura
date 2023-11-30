// data-service.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Almacén de datos (simulado, puedes reemplazarlo con una base de datos real)
const dataStore = [];

// Ruta para guardar datos
app.post('/save', (req, res) => {
  const { rut, nombreCompleto, nombreMedico, fechaAtencion, telefono, direccion } = req.body;


  const newData = {
    rut,
    nombreCompleto,
    nombreMedico,
    fechaAtencion,
    telefono,
    direccion,
  };

  dataStore.push(newData);

  console.log('Datos recibidos:', newData);

  res.json({ success: true, message: 'Datos guardados exitosamente' });
});

// Ruta para obtener todos los datos almacenados
app.get('/get-all', (req, res) => {
  res.json({ success: true, data: dataStore });
});

app.listen(port, () => {
  console.log(`Data service running at http://localhost:${port}`);
});
