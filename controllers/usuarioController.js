import { check, validationResult } from 'express-validator';
import Usuario from "../models/Usuario.js";



const formularioLogin = (req, res) => { 
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    });
}
const formularioRegistro = (req, res) => { 
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    });
}

const registrar = async (req, res) => {
    console.log(req.body);
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
            errores: [{msg: 'El usuario ya esta registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
            }
        });
    }
    //Crear usuario
    const usuario = new Usuario({ nombre, email, password });
    try {
        await usuario.save();
        return res.render('auth/login');
    } catch (error) {
        console.log(error);
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
    formularioOlvidePassword
}