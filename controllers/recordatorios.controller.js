/*  nombre: String,
        descripcion: String,
        fecha: Date,
        prioridad: String */
/* import User from '../models/user.js' */

const User = require('../models/user.js');


const getRecordatorios = async (req, res) => {
    const {user_id} = req.user
    const response = await User.findById(user_id)
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const recordatorios = response.recordatorios;
    if(recordatorios != null) res.status(200).json(recordatorios);
}

const createRecordatorio = async (req, res) => {
    const {user_id} = req.user
    const response = await User.findById(user_id)
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const recordatorio = req.body;
    response.recordatorios.push(recordatorio);
    await response.save();
    res.status(200).json({message: "Recordatorio creado", recordatorio: recordatorio});

}

const updateRecordatorio = async (req, res) => {
    const {user_id} = req.user
    const id = req.params.id;
    const response = await User.findById(user_id)
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const recordatorio = response.recordatorios.find(recordatorio => recordatorio._id == id);
    if(recordatorio != null) {
        recordatorio.nombre = req.body.nombre || recordatorio.nombre;
        recordatorio.descripcion = req.body.descripcion || recordatorio.descripcion;
        recordatorio.fechaLimite = req.body.fechaLimite || recordatorio.fechaLimite;
        recordatorio.prioridad = req.body.prioridad || recordatorio.prioridad;
        recordatorio.completed = req.body.completed || recordatorio.completed;
        await response.save();
        res.status(200).json({message: "Recordatorio actualizado", recordatorio: recordatorio});
    }

}

const deleteRecordatorio = async (req, res) => {
    const {user_id} = req.user
    const id = req.params.id;
    const response = await User.findById(user_id)
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const recordatorio = response.recordatorios.find(recordatorio => recordatorio._id == id);
    if(recordatorio != null) {
        response.recordatorios = response.recordatorios.filter(recordatorio => recordatorio._id != id);
        await response.save();
        res.status(200).json({message: "Recordatorio eliminado", recordatorio: recordatorio});
    }
}


module.exports = {
    getRecordatorios,
    createRecordatorio,
    updateRecordatorio,
    deleteRecordatorio
}