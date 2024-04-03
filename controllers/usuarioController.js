

const formularioLogin = (req, res) => { 
    res.render('auth/login', {
        autenticado: true,
    });
}
const formularioRegistro = (req, res) => { 
    res.render('auth/registro', {

    });
}
export {
    //Podemos tener varios metodos en un controlador
    formularioLogin,
    formularioRegistro
}