const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200', // Reemplaza con la URL del frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nicolascarmonarioseco@gmail.com',
    pass: 'vjil icvw jdht befz '
  }
});

app.post('/send-email', (req, res) => {
  const { recipients, message } = req.body;

  const mailOptions = {
    from: 'nicolascarmonarioseco@gmail.com',
    to: recipients,
    subject: 'Campaña de Marketing',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      res.json({ success: true, info });
    }
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Email-Campaign API escuchando en el puerto ${PORT}`);
});