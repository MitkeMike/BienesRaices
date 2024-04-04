import express from 'express'; // Import express
import usuarioRoutes from './routes/usuarioRoutes.js'; // Import the router object
import db from './config/db.js';


const app = express(); // Create an express app

//Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));


//Conexion a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Connection has been established successfully.');
} catch (error) {   
    console.error('Unable to connect to the database:', error);
}

//Definimos el puerto
const port = 3000; // Set the port


//Habilitar pug
app.set('view engine', 'pug');
app.set('views', './views');

//Carpeta public
app.use(express.static('public'));

//Routing
app.use('/auth', usuarioRoutes); // Use the router object to handle requests to the root URL



app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Listen for requests
});