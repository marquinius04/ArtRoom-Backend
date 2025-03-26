require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <-- Importa cors
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors()); // <-- Habilita CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/usuarios', require('./routes/usuarioRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
