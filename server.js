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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
