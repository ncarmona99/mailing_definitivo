const express = require('express');
const nodemailer = require('nodemailer');
const kafka = require('kafka-node');
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

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const consumer = new Consumer(client, [{ topic: 'email-topic', partition: 0 }], { autoCommit: true });

consumer.on('message', (message) => {
  const { recipients, message: emailMessage } = JSON.parse(message.value);

  const mailOptions = {
    from: 'nicolascarmonarioseco@gmail.com',
    to: recipients,
    subject: 'Campaña de Marketing',
    text: emailMessage
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
});

consumer.on('error', (error) => {
  console.error('Error in Kafka Consumer:', error);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Email-Campaign API escuchando en el puerto ${PORT}`);
});