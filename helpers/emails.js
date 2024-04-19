import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token} = datos;

    //Enviar Email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com',
        html: `
            <h1>Confirma tu cuenta</h1>

            <p>Hola ${nombre}, solo falta un paso para confirmar tu cuenta</p>
            <p>Presiona el siguiente enlace:</p>
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000 }/auth/confirmar/${token}">Confirmar Cuenta</a>

            <p>Si tu no creaste esta cuenta, ignora el mensaje</p>
        `
    });

}

export {
    emailRegistro
}