const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./js/autentificador'); // Ajusta la ruta según tu estructura de carpetas

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('datos:', username, password);

  // Utiliza tu módulo de autenticación
  if (auth.authenticate(username, password)) {
    res.json({ success: true, message: 'Inicio de sesión exitoso' });
  } else {
    res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
  }
});

app.post('/sa', (req, res) => {
  // Aquí puedes agregar lógica para verificar la autenticación antes de guardar los datos
  // Por ejemplo, podrías verificar si el usuario tiene una sesión válida
  // Antes de permitir guardar datos

  // Para simplificar, solo reenviamos la solicitud al servicio de datos
  const { data } = req.body;

  // Envia la solicitud al servicio de datos
  fetch('http://localhost:4000/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })
  .then(response => response.json())
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    console.error('Error al guardar datos:', error);
    res.status(500).json({ success: false, message: 'Error al guardar datos' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
