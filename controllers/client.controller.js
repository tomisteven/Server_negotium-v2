/*
import User from "../models/user";
import {
    getFiles
} from "../utils/images";
 */

const User = require("../models/user");
const {
    getFiles
} = require("../utils/images");

const allServicesOfAllClients = async (req, res) => {
    const {user_id} = req.user;
    const response = await User.findById(user_id);

     const clients = response.clientes;
    const services = [];
    clients.forEach(client => {
        client.nextServices.forEach(service => {
            services.push({
                title: client.nombre + " " + client.apellido + " - " + service.fecha.getHours()+ ":" + service.fecha.getMinutes() + `${service.fecha.getHours() > 12 ? " pm" : " am"}` ,
                date: service.fecha,
            });
        })
        client.serviciosadquiridos.forEach(service => {
            services.push({
                title: service.nombre,
                date: service.fecha,
            });
        })
    })
    await res.status(200).json(services);
}

const addDeuda = async (req, res) => {
    const {user_id} = req.user;
    const {id}  = req.params;
    const response = await User.findById(user_id);
    const {deuda} = req.body;
    const client = response.clientes.find(client => client._id == id);
    //console.log(client);
     if(!client){
        res.status(400).json({message: "El cliente no existe"});
    }
    response.deudas += deuda;
    client.deudaTotal += deuda;
    client.deuda = true;
    await response.save();
    res.status(200).json({cliente: client});
}

const deleteDeuda = async (req, res) => {
    const {user_id} = req.user;
    const {id}  = req.params;
    const {deuda, resta} = req.body;
    const response = await User.findById(user_id);
    const client = response.clientes.find(client => client._id == id);
    //console.log(client);
     if(!client){
        res.status(400).json({message: "El cliente no existe"});
    }
    resta ? response.deudas -= deuda : response.deudas += parseInt(deuda);
    resta ? client.deudaTotal -= deuda : client.deudaTotal += parseInt(deuda);
    if(client.deudaTotal == 0) client.deuda = false;

    await response.save();
    res.status(200).json({cliente: client});
}

const createClient = async (req, res) => {
    const {user_id} = req.user;
    const response = await User.findById(user_id);

    const client = response.clientes.find(client => client.email == req.body.email);
    if(client){
        res.status(400).json({message: "El cliente con ese EMAIL ya existe"});
    }else{
        response.recaudado += req.body.gastoTotal;
        response.deudas += req.body.deudaTotal;
        response.clientes.push(req.body);
        await response.save();
        res.status(200).json({message: "Cliente creado", client: req.body});
    }
};

const getAllClients = async (req, res) => {

    const {user_id} = req.user;
    const response = await User.findById(user_id);
    //console.log(response);
     const clients = response.clientes
    if (clients != null && clients.length > 0) {
        res.status(200).json(clients);
    }
    else {
        res.status(404).json({message: "No hay clientes"});
    }
}

const getClientX = async (req, res) => {
    const {user_id} = req.user;
    const {genero} = req.query;
    const user = await User.findById(user_id);

    //console.log(genero);
     const clients = user.clientes;
    if (clients != null && clients.length > 0) {
        const clientsX = clients.filter(client => client.genero == genero);
        res.status(200).json(clientsX);
    }else{
        res.status(404).json([]);
    }
}

const getClientConDeuda = async (req, res) => {
    const {user_id} = req.user;
    const response = await User.findById(user_id);
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const clientsConDeuda = response.clientes.filter(client => client.deuda == true);
     if (clientsConDeuda != null && clientsConDeuda.length > 0) {
        res.status(200).json(clientsConDeuda);
    }
    else {
        res.status(404).json(clientsConDeuda);
    }
    //console.log(clientsConDeuda);
}

const clientesConDeudaItem = async (req, res) => {
    const {user_id} = req.user;
    const estado = req.query.estado;

    const response = await User.findById(user_id);
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const clientsItem = response.clientes.filter(client => client.deuda === false);
    const items= []
    clientsItem.forEach((item, index) => {
        items.push(
            item.nombre + " " + item.apellido,
        )
    })
    if (items != null ) {
        res.status(200).json(items);
    }
}
const clientesSinDeudaItem = async (req, res) => {
    const {user_id} = req.user;
    const estado = req.query.estado;

    const response = await User.findById(user_id);
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const clientsItem = response.clientes.filter(client => client.deuda === true);
    const items= []
    clientsItem.forEach((item, index) => {
        items.push(
            item.nombre + " " + item.apellido,
        )
    })
    if (items != null ) {
        res.status(200).json(items);
    }
}



const getClientSinDeuda = async (req, res) => {
    const {user_id} = req.user;
    const response = await User.findById(user_id);
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const clientSinDeuda = response.clientes.filter(client => client.deuda == false);
    if(clientSinDeuda != null && clientSinDeuda.length > 0) res.status(200).json(clientSinDeuda);
    else res.status(404).json(clientSinDeuda);

}

const getServicesOfClient = async (req, res) => {
    const client_id = req.params.id;
    const {user_id} = req.user;
    const response = await User.findById(user_id);
    const client = response.clientes.find(client => client._id == client_id);
    if(!client) res.status(404).json({message: "No hay cliente con ese id"});
    const services = client.serviciosadquiridos;
    if(services != null && services.length > 0) res.status(200).json(services);
    else res.status(404).json({message: "No hay servicios para este cliente"});
}

const getClient = async (req, res) => {
    const client_id = req.params.id;
    const {user_id} = req.user;
    const response = await User.findById(user_id);
    const client = response.clientes.find(client => client._id == client_id);
    if(client != null) res.status(200).json(client);
    else res.status(404).json({message: "No hay cliente con ese id"});
}

const completeServiceFuture = async (req, res) => {
    const client_id = req.params.id;
    const service_id = req.params.id_service;
    const {user_id} = req.user;

    const user = await User.findById(user_id);
    const client = user.clientes.find(client => client._id == client_id);
    const service = client.nextServices.find(service => service._id == service_id);
    if(!service) res.status(404).json({message: "No hay servicio con ese id"});
    service.complete = true;
    user.recaudado += service.precio;
    client.serviciosadquiridos.push(service);
    client.nextServices = client.nextServices.filter(service => service._id != service_id);
    await user.save();
    res.status(200).json({message: "Servicio completado", client: client.serviciosadquiridos});
}


const addServiceFuture = async (req, res) => {
     const client_id = req.params.id;
    const {user_id} = req.user;
    const response  = await User.findById(user_id);
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    /* const client = response.clientes.find(client => client._id == client_id);
    client.nextServices.push(req.body); */

    /* await response.save();
    res.status(200).json({message: "Servicio añadido", client: client}); */
    console.log(req.body.nombre);
    const service = response.servicios.find(service => service.nombre == req.body.nombre);
    service.clientes += 1;
    console.log(service);
}

const addService = async (req, res) => {
    const client_id = req.params.id;
    const {user_id} = req.user;
    const response  = await User.findById(user_id);
    const service = response.servicios.find(service => service.nombre == req.body.nombre);
    const client = response.clientes.find(client => client._id == client_id);
    if(!client) res.status(404).json({message: "No hay cliente con ese id"});
    service.clientes += 1;
    response.recaudado += req.body.precio;
    client.serviciosadquiridos.push(req.body);
    response.totalServiciosUsados += 1;
    //console.log(response);
    if(!req.body.precio){
        res.status(400).json({message: "El precio es obligatorio"});
    }
    else{
        client.gastoTotal += req.body.precio;
        response.recaudado += req.body.precio;
        //console.log(response.recaudado, client.gastoTotal);
    }
    await response.save();

    res.status(200).json({message: "Servicio añadido", client: client});
}

const updateClient = async (req, res) => {
    const client_id = req.params.id;
    const {user_id} = req.user;
    const response = await User.findById(user_id);
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const client = response.clientes.find(client => client._id == client_id);
    if(client != null) {
        client.nombre = req.body.nombre || client.nombre;
        client.apellido = req.body.apellido || client.apellido;
        client.telefono = req.body.telefono || client.telefono;
        client.email = req.body.email || client.email;
        client.deuda = req.body.deuda || client.deuda;
        client.deudaTotal = req.body.deudaTotal || client.deudaTotal;
        client.dni = req.body.dni || client.dni;
        client.direccion = req.body.direccion || client.direccion;
        client.gastoTotal = req.body.gastoTotal || client.gastoTotal;
        client.serviciosadquiridos = req.body.serviciosadquiridos || client.serviciosadquiridos;
        client.genero = req.body.genero || client.genero;
        await response.save();
        res.status(200).json({message: "Cliente actualizado", client: client});
    }
    else res.status(404).json({message: "No hay cliente con ese id"});
}

const deleteClient = async (req, res) => {
    const client_id = req.params.id;
    const {user_id} = req.user
    const response = await User.findById(user_id)
    //console.log(response);
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
     const client = response.clientes.find(client => client._id == client_id);
    if(client != null) {
        response.recaudado -= client.gastoTotal;
        response.deudas -= client.deudaTotal;
        response.clientes.remove(client);
        await response.save();
        res.status(200).json({message: "Cliente eliminado", client: client});
    }else res.status(404).json({message: "No hay cliente con ese id"});
}

const deleteServiceClient = async (req, res) => {
    const {user_id} = req.user;
    const client_id = req.params.id;
    const service_id = req.params.service_id;
    const response = await User.findById(user_id);
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const client = response.clientes.find(client => client._id == client_id);
    if(client){
        const service = client.serviciosadquiridos.find(service => service._id == service_id);
        if(service != null) {
            client.serviciosadquiridos.remove(service);
            client.gastoTotal -= service.precio;
            response.recaudado -= service.precio;
            await response.save();
            res.status(200).json({message: "Servicio eliminado", client: client});
        }else res.status(404).json({message: "No hay servicio con ese id"});
    }
}

const deleteServiceFutureClient = async (req, res) => {
    const {user_id} = req.user;
    const client_id = req.params.id;
    const service_id = req.params.service_id;
    const response = await User.findById(user_id);
    const client = response.clientes.find(client => client._id == client_id);
    if(client){
        const service = client.nextServices.find(service => service._id == service_id);
        if(service != null) {
            client.nextServices.remove(service);
            await response.save();
            res.status(200).json({message: "Servicio eliminado", client: client});
        }else res.status(404).json({message: "No hay servicio con ese id"});
    }
}

const getServicesFuturesOfClient = async (req, res) => {
    const {user_id} = req.user;
    const client_id = req.params.id;
    const response = await  User.findById(user_id)
    if(!response) res.status(404).json({message: "No hay cliente con ese id"});
    const client = response.clientes.find(client => client._id == client_id);
    if(client != null) res.status(200).json(client.nextServices);
    else res.status(404).json({message: "No hay cliente con ese id"});
}

//LOGIN CLIENT
 const loginClient = async (req, res) => {
    //const {user_id} = req.user;
    const {id} = req.params;
    const {username, password} = req.body;
    const response = await User.findById(id);
    //onsole.log(response);
     const client = response.clientes.find(client => client.email == username && client.password == password || client.username == username && client.password == password);
     //console.log(client);
    if(client != null) res.status(200).json({message: "Cliente encontrado", client: client});
    else res.status(404).json({message: "Datos ingresados Incorrectos"});
}

const updateUsernamePassword = async (req, res) => {
    const {user_id} = req.user;
    const client_id = req.params.id;
    const response = await User.findById(user_id);
    const client = response.clientes.find(client => client._id == client_id);
    if(client != null) {
        //DEBO BUSCAR QUE EN TODO EL ARREGLO DE LOS CLIENTES EL USUARIO SEA DIFERENTE AL RESTO
        const us = response.clientes.find(client => client.username == req.body.username);
        if(us != null) res.status(404).json({message: "Ya existe un cliente con ese username"});
        else {
            client.username = req.body.username;
            client.password = req.body.password;
            await response.save();
            res.status(200).json({message: "Cliente actualizado", client: client});
        }
        /* PROBARLO */
    }
    else res.status(404).json({message: "No hay cliente con ese id"});
}

const urlLoginClient = async (req,res) => {
    const {user_id} = req.user
    const url = "http://localhost:3000/client/login/" + user_id;
    res.status(200).json({message: "URL", url: url});
}


module.exports = {
    urlLoginClient,
    createClient,
    getAllClients,
    getClient,
    updateClient,
    deleteClient,
    getClientConDeuda,
    getClientSinDeuda,
    getServicesOfClient,
    addServiceFuture,
    addService,
    deleteServiceClient,
    deleteServiceFutureClient,
    updateUsernamePassword,
    loginClient,
    getServicesFuturesOfClient,
    clientesConDeudaItem,
    clientesSinDeudaItem,
    getClientX,
    addDeuda,
    deleteDeuda,
    completeServiceFuture,
    allServicesOfAllClients
}
