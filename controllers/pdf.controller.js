const User = require("../models/user");
const cloudinary = require("cloudinary");
const fs = require("fs");
const moment = require("moment-timezone");

const createPdf = async (req, res) => {
  const { user_id } = req.user;
  const { nombre, servicio, tipo } = req.body;
  const response = await User.findById(user_id);
  const pdfs = response.pdfs;

  const membresia_active = response.membresias.find((m) => m.activa === true);
  if (membresia_active.archivos_max == pdfs.length) {
    return res.status(400).json({ message: "No puedes subir mas archivos" });
  } else {
    if (req.files) {
      cloudinary.v2.uploader.upload(
        req.files.url.path,
        { public_id: nombre },
        function (error, result) {
          const newPdf = {
            nombre: nombre,
            servicio: servicio,
            tipo: tipo,
            url: result.url || null,
            fecha: moment()
              .tz("America/Argentina/Buenos_Aires")
              .format("DD/MM/YYYY HH:mm:ss"),
          };
          pdfs.push(newPdf);
          response.pdfs = pdfs;
          fs.unlink(req.files.url.path, (err) => {
            if (err) {
              res.status(500).send({ message: "Error al eliminar el archivo" });
            }
          });
          response.save((err, pdfStored) => {
            if (err) {
              res.status(500).send({ message: "Error del servidor" });
            } else {
              if (!pdfStored) {
                res.status(404).send({ message: "No se ha encontrado el pdf" });
              } else {
                res.status(200).send({
                  code: 200,
                  message: "Pdf creado correctamente",
                  newPdf,
                });
              }
            }
          });
        }
      );
    } else {
      res.status(404).json({ message: "No hay archivos" });
    }
  }
};

const getPDFs = async (req, res) => {
  const { user_id } = req.user;
  const response = await User.findById(user_id);
  const pdfs = response.pdfs;
  response
    ? res.status(200).json(pdfs)
    : res.status(404).json({ message: "No es un id Valido" });
};

const get = async (req, res) => {
  const { user_id } = req.user;
  const id = req.params.id;
  const response = await User.findById(user_id);
  const pdfs = response.pdfs;
  const pdf = pdfs.filter((pdf) => {
    return pdf._id == id;
  });

  response
    ? res.status(200).json(pdf)
    : res.status(404).json({ message: "No es un id Valido" });
};

const deletePdf = async (req, res) => {
  const { user_id } = req.user;
  const id = req.params.id;
  const response = await User.findById(user_id);
  const pdfs = response.pdfs;
  const newPdfs = pdfs.filter((pdf) => {
    return pdf._id != id;
  });
  response.pdfs = newPdfs;
  const result = await response.save();

  //eliminar del servidor
  const pdf = pdfs.filter((pdf) => {
    return pdf._id == id;
  });
  const url = pdf[0].url;
  const path = `./uploads/${url}`;
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Archivo eliminado");
    }
  });
  result
    ? res.status(200).json(result.pdfs)
    : res.status(404).json({ message: "No es un id Valido" });
};

module.exports = {
  createPdf,
  getPDFs,
  deletePdf,
  get,
};
