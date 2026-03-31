require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//-- Configurar motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//-- Middlewares Globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-- Ruta principal
app.get('/', (req, res) => {
  res.render('index');
});

//-- Importar las rutas
// Importamos la ruta de messages
const messageRoutes = require('./routes/messages');

//-- Montamos las rutas 
// "/messages"
app.use('/messages', messageRoutes);

// Middleware de manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack); // Mostrar el error en la consola
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
    error: err,
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});