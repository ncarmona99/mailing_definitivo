const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment'); // Para gestionar horarios
const nodemailer = require('nodemailer'); // Para envío de correos (opcional)
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200' // Permitir solo este origen
}));

const transporter = nodemailer.createTransport({
  service: 'gmail', // Usando Gmail como servicio, pero puedes cambiarlo por el que necesites
  auth: {
    user: 'nicolascarmonarioseco@gmail.com', // Cambia a tu correo
    pass: 'vjil icvw jdht befz ' // Cambia a tu contraseña o token de aplicación
  }
});

// Función para enviar el correo
const sendEmail = (recipient, message) => {
  const mailOptions = {
    from: 'nicolascarmonarioseco@gmail.com', // Cambia a tu correo
    to: recipient,
    subject: 'Campaña de Marketing',
    text: message
  };

  return transporter.sendMail(mailOptions);
};

// Base de datos simulada
let campaigns = [];
let noDisturbList = ["user1@example.com", "user2@example.com"]; // Lista de "no molestar"
let analytics = { sent: 0, notSent: 0, bounced: 0, errors: 0 };

app.use(bodyParser.json());

// Ruta para enviar una campaña
app.post('/campaign/send', (req, res) => {
  const { message, recipients } = req.body;

  // Filtrar la lista de "no molestar"
  const validRecipients = recipients.filter(recipient => !noDisturbList.includes(recipient));
  if (validRecipients.length === 0) {
    return res.status(400).json({ error: 'No hay destinatarios válidos para enviar' });
  }

  // Simulación de envío de campaña
  const campaignId = `${Date.now()}`;
  campaigns.push({ campaignId, message, recipients: validRecipients });

  // Enviar correos a los destinatarios válidos de inmediato
  Promise.all(validRecipients.map(recipient => sendEmail(recipient, message)))
    .then(() => {
      // Actualizar analíticas
      analytics.sent += validRecipients.length;
      analytics.notSent += recipients.length - validRecipients.length;

      // Responder con éxito y analíticas
      res.json({
        success: true,
        campaignId,
        sent: analytics.sent,
        notSent: analytics.notSent,
        bounced: analytics.bounced,
        errors: analytics.errors
      });
    })
    .catch(error => {
      console.error('Error al enviar los correos:', error);
      res.status(500).json({ error: 'Hubo un error al enviar los correos.' });
    });
});

// Ruta para obtener analíticas de una campaña específica
app.get('/campaign/analytics/:campaignId', (req, res) => {
  const { campaignId } = req.params;

  // Simulación de recuperación de analíticas por campaña
  const campaignAnalytics = campaigns.find(c => c.campaignId === campaignId);
  if (!campaignAnalytics) {
    return res.status(404).json({ error: 'Campaña no encontrada' });
  }

  res.json({
    sent: analytics.sent,
    notSent: analytics.notSent,
    bounced: analytics.bounced,
    errors: analytics.errors
  });
});

// Ruta para obtener la lista de "no molestar"
app.get('/campaign/no-disturb-list', (req, res) => {
  res.json(noDisturbList);
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor de la API de campaña escuchando en el puerto ${PORT}`);
});