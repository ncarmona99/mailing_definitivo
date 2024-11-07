const express = require('express');
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

// Lista de "no molestar"
const noDisturbList = ["user1@example.com", "user2@example.com"];

app.get('/no-disturb-list', (req, res) => {
  res.json(noDisturbList);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`No-Disturb API escuchando en el puerto ${PORT}`);
});