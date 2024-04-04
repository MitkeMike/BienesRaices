import express from 'express'; // Import express
import { formularioLogin, formularioRegistro, formularioOlvidePassword, registrar } from '../controllers/usuarioController.js';
//Routing
const router = express.Router(); // Create a new router object to handle HTTP requests

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro)
router.post('/registro', registrar)


router.get('/olvide-password', formularioOlvidePassword)
export default router; // Export the router object