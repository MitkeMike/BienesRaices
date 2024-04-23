import express from 'express'; // Import express
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js'; // Import the router object
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import db from './config/db.js';


const app = express(); // Create an express app

//Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

//Habilitar cookies-parser
app.use(cookieParser());

//Habilitar CSRF
app.use(csrf({ cookie: true }));


//Conexion a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Connection has been established successfully.');
} catch (error) {   
    console.error('Unable to connect to the database:', error);
}

//Definimos el puerto
const port = process.env.PORT || 3000; // Set the port


//Habilitar pug
app.set('view engine', 'pug');
app.set('views', './views');

//Carpeta public
app.use(express.static('public'));

//Routing
app.use('/auth', usuarioRoutes); // Use the router object to handle requests to the root URL
app.use('/', propiedadesRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Listen for requests
});