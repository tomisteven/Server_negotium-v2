// Importar el módulo nodemailer
const nodemailer = require('nodemailer');

// Configurar los datos de autenticación del servicio de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'totosteven65@gmail.com',
    pass: 't0m4s153475',
  },
});

// Crear una función que envíe el correo electrónico
function enviarEmail(destinatario, asunto, mensaje) {
  // Configurar los datos del correo electrónico
  const mailOptions = {
    from: 'totosteven65@gmail.com',
    to: destinatario,
    subject: asunto,
    text: mensaje,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
    }
  });
}



// Exportar la función
module.exports = enviarEmail;
