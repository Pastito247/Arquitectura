// payment-service.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/process-payment', (req, res) => {
  const { consultaId, monto, tarjeta, nombreTitular, fechaExpiracion, cvv } = req.body;
  const pagoExitoso = true;

  if (pagoExitoso) {
    res.json({ success: true, message: 'Pago procesado exitosamente' });
  } else {
    res.status(500).json({ success: false, message: 'Error al procesar el pago' });
  }
});

app.listen(port, () => {
  console.log(`Payment service running at http://localhost:${port}`);
});
