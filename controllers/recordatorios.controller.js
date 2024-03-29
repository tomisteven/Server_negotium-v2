/*  nombre: String,
        descripcion: String,
        fecha: Date,
        prioridad: String */
/* import User from '../models/user.js' */

const User = require("../models/user.js");

const deleteAllRecordatorios = async (req, res) => {
  const { user_id } = req.user;
  const user = await User.findById(user_id);

  if (!user) res.status(404).json({ message: "No hay cliente con ese id" });
  const recordatorios = user.recordatorios;
  recordatorios.splice(0, recordatorios.length);
  const result = await user.save();
  result
    ? res.status(200).json({ message: "Recordatorios eliminados", r: result.recordatorios })
    : res.status(404).json({ message: "Error" });
}

const completeAllAlerts = async (req, res) => {
  const { user_id } = req.user;
  const user = await User.findById(user_id);
  const {state} = req.body;
  if (!user) res.status(404).json({ message: "No hay cliente con ese id" });
  const recordatorios = user.recordatorios;
  //console.log(user);
   recordatorios.forEach((r) => {
    r.completed = state;
  });
  const result = await user.save();
  result
    ? res.status(200).json({ message: "Recordatorios completados" })
    : res.status(404).json({ message: "No es un id Valido" });
}


const toggleRecordatorio = async (req, res) => {
  const { user_id } = req.user;
  const id = req.params.id;

  const resp = await User.findById(user_id);
  const recordatorio = resp.recordatorios;
  const res2 = recordatorio.filter((r) => {
    return r._id == id;
  });
  const res3 = res2[0];
  res3.completed = !res3.completed;
  const result = await resp.save();
  result
    ? res.status(200).json({ state: res3.completed })
    : res.status(404).json({ message: "No es un id Valido" });
};

const getRecordatorios = async (req, res) => {
  const { user_id } = req.user;
  const response = await User.findById(user_id);
  if (!response) res.status(404).json({ message: "No hay cliente con ese id" });
  const recordatorios = response.recordatorios;
  if (recordatorios != null) res.status(200).json(recordatorios);
};

const createRecordatorio = async (req, res) => {
  const { user_id } = req.user;
  const response = await User.findById(user_id);
  if (!response) res.status(404).json({ message: "No hay cliente con ese id" });
  const membresia_active = response.membresias.find((m) => m.activa == true);
  if (membresia_active.recordatorios_max == response.recordatorios.length) {
    res.status(400).json({ message: "No puede agregar mas recordatorios" });
  } else {
    const recordatorio = req.body;
    response.recordatorios.push(recordatorio);
    await response.save();
    res
      .status(200)
      .json({ message: "Recordatorio creado", recordatorio: recordatorio });
  }
};

const updateRecordatorio = async (req, res) => {
  const { user_id } = req.user;
  const id = req.params.id;
  const response = await User.findById(user_id);
  if (!response) res.status(404).json({ message: "No hay cliente con ese id" });
  const recordatorio = response.recordatorios.find(
    (recordatorio) => recordatorio._id == id
  );
  if (recordatorio != null) {
    recordatorio.nombre = req.body.nombre || recordatorio.nombre;
    recordatorio.descripcion = req.body.descripcion || recordatorio.descripcion;
    recordatorio.fechaLimite = req.body.fechaLimite || recordatorio.fechaLimite;
    recordatorio.prioridad = req.body.prioridad || recordatorio.prioridad;
    recordatorio.completed = req.body.completed || recordatorio.completed;
    await response.save();
    res
      .status(200)
      .json({
        message: "Recordatorio actualizado",
        recordatorio: recordatorio,
      });
  }
};

const deleteRecordatorio = async (req, res) => {
  const { user_id } = req.user;
  const id = req.params.id;
  const response = await User.findById(user_id);
  if (!response) res.status(404).json({ message: "No hay cliente con ese id" });
  const recordatorio = response.recordatorios.find(
    (recordatorio) => recordatorio._id == id
  );
  if (recordatorio != null) {
    response.recordatorios = response.recordatorios.filter(
      (recordatorio) => recordatorio._id != id
    );
    await response.save();
    res
      .status(200)
      .json({ message: "Recordatorio eliminado", recordatorio: recordatorio });
  }
};

module.exports = {
  getRecordatorios,
  createRecordatorio,
  updateRecordatorio,
  deleteRecordatorio,
  toggleRecordatorio,
  completeAllAlerts,
   deleteAllRecordatorios
};
