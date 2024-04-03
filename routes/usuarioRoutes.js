import express from 'express'; // Import express
import { formularioLogin, formularioRegistro } from '../controllers/usuarioController.js';
//Routing
const router = express.Router(); // Create a new router object to handle HTTP requests

router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro)
export default router; // Export the router object