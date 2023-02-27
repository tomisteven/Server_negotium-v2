/* import User from '../models/user.js'; */

const User = require("../models/user.js");

/* servicios: [{
        nombre: String,
        precio: Number,
        cantidadVendidos: Number,
        cantidadDisponibles: Number,
        descripcion: String,
        imagen: String,
        fecha: Date
}],*/

const getServices = async (req, res) => {
  const { user_id } = req.user;
  const response = await User.findById(user_id);
  const services = response.servicios;
  response
    ? res.status(200).json(services)
    : res.status(404).json({ message: "No es un id Valido" });
};

const createService = async (req, res) => {
  const { user_id } = req.user;
  const {
    nombre,
    precio,
    cantidadVendidos,
    cantidadDisponibles,
    descripcion,
    imagen,
  } = req.body;
  const response = await User.findById(user_id);
  const services = response.servicios;
  const newService = {
    nombre,
    precio,
    cantidadVendidos,
    cantidadDisponibles,
    descripcion,
  };
  services.push(newService);
  response.servicios = services;
  const result = await response.save();
  result
    ? res.status(200).json(result)
    : res.status(404).json({ message: "No es un id Valido" });
};

const itemService = async (req, res) => {
  const { user_id } = req.user;
  const response = await User.findById(user_id);
  const services = response.servicios;
  const items = [];
  services.forEach((item, index) => {
    items.push(item.nombre);
  });
  response
    ? res.status(200).json(items)
    : res.status(404).json({ message: "No es un id Valido" });
};

const deleteService = async (req, res) => {
  const { user_id } = req.user;
  const id = req.params.id;
  const response = await User.findById(user_id);
  const services = response.servicios;
  const newServices = services.filter((service) => {
    return service._id != id;
  });
  response.servicios = newServices;
  const result = await response.save();
  result
    ? res.status(200).json(result)
    : res.status(404).json({ message: "No es un id Valido" });
};

const toggleService = async (req, res) => {
  const { user_id } = req.user;
  const id = req.params.id;

  const resp = await User.findById(user_id);
  const services = resp.servicios;
  const res2 = services.filter((service) => {
    return service._id == id;
  });
  const res3 = res2[0];
  res3.habilitado = !res3.habilitado;
  const result = await resp.save();
  result
    ? res.status(200).json(result)
    : res.status(404).json({ message: "No es un id Valido" });
};

const updateService = async (req, res) => {
  const { user_id } = req.user;
  const id = req.params.id;
  const form = req.body;

  const usuario = await User.findById(user_id);
  const service = usuario.servicios.find((s) => s._id == id);
  service.nombre = form.nombre || service.nombre;
  service.precio = form.precio || service.precio;
  service.cantidadVendidos = form.cantidadVendidos || service.cantidadVendidos;
  service.cantidadDisponibles = form.cantidadDisponibles || service.cantidadDisponibles;
  service.descripcion = form.descripcion || service.descripcion;
  service.habilitado = form.habilitado || service.habilitado;
  service.clientes = form.clientes || service.clientes;

  const result = await usuario.save();

  result
    ? res.status(200).json(result)
    : res.status(404).json({ message: "No es un id Valido" });
};

module.exports = {
  getServices,
  createService,
  itemService,
  deleteService,
  toggleService,
  updateService,
};
