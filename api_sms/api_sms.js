const express = require('express');
const twilio = require('twilio');
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const accountSid = 'AC1e3a9d02d9010addd1719f59f46198ef';
const authToken = '78aae51b59ea0ea4446e8a599315a889';
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { recipients, message } = req.body;

  Promise.all(
    recipients.map(recipient =>
      client.messages.create({
        body: message,
        from: '+12513339524',
        to: recipient
      })
    )
  )
    .then(messages => res.json({ success: true, messages }))
    .catch(error => {
      console.error('Error al enviar SMS:', error);
      res.status(500).json({ error: 'Error al enviar SMS' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SMS-Campaign API escuchando en el puerto ${PORT}`);
});