import { check, validationResult } from 'express-validator';
import Usuario from "../models/Usuario.js";
import { generarId } from '../helpers/tokens.js';
import { emailRegistro } from '../helpers/emails.js';


const formularioLogin = (req, res) => { 
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    });
}
const formularioRegistro = (req, res) => { 
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken : req.csrfToken()
    });
}

const registrar = async (req, res) => {

    //validacion
    await check('nombre').not().isEmpty().withMessage('El nombre es obligatorio').run(req);
    await check('email').isEmail().withMessage('Email no valido').run(req);
    await check('password').isLength({min: 6}).withMessage('La contraseña debe contener al menos 6 caracteres').run(req);
    //Validar la contrase;a de manera custom
    await check('repetir_password').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }).run(req);
    //Revision de errores
    let errors = validationResult(req);
    

    //Verificar que el resultado este vacio
    if (!errors.isEmpty()) {
        return  res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: errors.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,

            }
        });
    }
    //Extraer datos
    const { nombre, email, password } = req.body;

    //Verificar si el usuario ya esta registrado
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
        return  res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken : req.csrfToken(),
            errores: [{msg: 'El usuario ya esta registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
            }
        });
    }
    //Crear el usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId(),
    });

    //Enviar Email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    //Mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un Email de confirmacion, presiona en el enlace.'
    });

}

//Funcion para confirmar Cuenta
const confirmar = async (req, res, next) => {
    const { token } = req.params;

    try {
        // Verificar si el token es válido
        const usuario = await Usuario.findOne({ where: { token } });

        if (!usuario) {
            return res.render('auth/confirmar-cuenta', {
                pagina: 'Error al confirmar tu cuenta',
                mensaje: 'Hubo un error al confirmar tu cuenta, intenta nuevamente',
                error: true
            });
        }

        // Confirmar la cuenta
        usuario.token = null;
        usuario.confirmado = true; 
        await usuario.save();

        // Renderizar la vista de confirmación
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Cuenta Confirmada Correctamente',
            mensaje: 'Tu cuenta ha sido confirmada correctamente, ya puedes iniciar sesión.',
            error: false // Cambiado a false ya que no hay error
        });
    } catch (error) {
        // Manejar errores de forma adecuada
        console.error('Error al confirmar la cuenta:', error);
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta nuevamente',
            error: true
        });
    }
}




const formularioOlvidePassword = (req, res) => { 
    res.render('auth/olvide-password', {
        pagina: 'Recuperar Contraseña'
    });
}
export {
    //Podemos tener varios metodos en un controlador
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword
}