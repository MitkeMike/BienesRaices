import express from 'express'; // Import express
import { formularioLogin, formularioRegistro, confirmar, formularioOlvidePassword, registrar } from '../controllers/usuarioController.js';
//Routing
const router = express.Router(); // Create a new router object to handle HTTP requests

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro)
router.post('/registro', registrar)

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioOlvidePassword)
export default router; // Export the router object