const dotenv = require('dotenv');
dotenv.config();

require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors'); // <-- Importa cors
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors()); // <-- Habilita CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/usuarios', require('./routes/usuarioRoutes'))
app.use('/api/recursos', require('./routes/recursoRoutes'))
app.use('/api/categorias', require('./routes/categoriaRoutes'))
app.use('/api/comentarios', require('./routes/comentarioRoutes'))
app.use('/api/historialDescargas', require('./routes/historialDescargaRoutes'))
app.use('/api/assets', require('./routes/dropbox'));
app.use('/api/tipos', require('./routes/tipoArchivoRoutes'));




app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
