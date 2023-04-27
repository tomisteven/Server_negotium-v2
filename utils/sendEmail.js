// Importar el módulo nodemailer
const nodemailer = require('nodemailer');

export const sendEmail =  async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'digitalcodeoficial@gmail.com',
      pass: 'cqmiuxtofcdhmxnt',
    },
  });
  // Obtener datos del formulario enviado
const nombre = req.body.nombre;
const correo = req.body.correo;
const mensaje = req.body.mensaje;

// Definir el contenido del correo electrónico
let mailOptions = {
  from: 'digitalcodeoficial@gmail.com',
  to: correo,
  subject: 'Nuevo mensaje de ' + nombre,
  text: mensaje + '\n\nCorreo electrónico de contacto: ' + correo
};

// Enviar el correo electrónico
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
    res.send('Error al enviar el correo electrónico');
  } else {
    console.log('Correo electrónico enviado: ' + info.response);
    res.send('Correo electrónico enviado correctamente');
  }
});

}

module.exports = {
  sendEmail
}