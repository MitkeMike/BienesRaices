import express from 'express'; // Import express
import usuarioRoutes from './routes/usuarioRoutes.js'; // Import the router object

const app = express(); // Create an express app
//Definimos el puerto
const port = 3000; // Set the port


//Habilitar pug
app.set('view engine', 'pug');
app.set('views', './views');

//Routing
app.use('/auth', usuarioRoutes); // Use the router object to handle requests to the root URL



app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Listen for requests
});