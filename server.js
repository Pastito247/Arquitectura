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


app.post('/sa', (req, res) => {
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
app.post('/process-payment', async (req, res) => {
  const { consultaId, monto, tarjeta, nombreTitular, fechaExpiracion, cvv } = req.body;

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
      // Puedes hacer algo adicional después de procesar el pago exitosamente, si es necesario
    } else {
      throw new Error(`Error al procesar el pago: ${data.message}`);
    }
  } catch (error) {
    console.error('Error de red:', error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
