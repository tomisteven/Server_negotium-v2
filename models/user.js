/* import mongoose, {Schema} from "mongoose"; */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
    },
    password: String,
    role : String,

    membresia: Boolean,
    avatar: String,
    url_login: String,
    recaudado: {
        type: Number,
        default: 0
    },
    deudas: {
        type: Number,
        default: 0
    },
    totalServiciosUsados: {
        type: Number,
        default: 0
    },
    clientes: [
        {
        genero : {
            type: String,
            default: "Masculino"
        },
        username: String,
        password: {
            type: String,
            default: "123456"
        },
        nombre: String,
        apellido: String,
        telefono: String,
        email: {
            type: String
        },
        direccion: String,
        fecha: {
            type: Date,
            default: Date.now()
        },
        deuda: {
            type: Boolean,
            default: false
        },
        deudaTotal: {
            type: Number,
            default: 0
        },
        gastoTotal: {
            type: Number,
            default: 0
        },
        serviciosadquiridos: [{
            nombre: String,
            precio: Number,
            cantidad: Number,
            fecha: {
                type: Date,
                default: Date.now()
            },
            completed: {
                type: Boolean,
                default: true
            },
        }],
        nextServices: [{
            nombre: String,
            precio: Number,
            fecha : {
                type: Date,
                default: Date.now()
            },
            completed: {
                type: Boolean,
                default: false
            },
        }],
    }],
    servicios: [{
        nombre: String,
        precio: Number,
        cantidadVendidos: Number,
        clientes: {
            type: Number,
            default: 0
        },
        cantidadDisponibles: Number,
        descripcion: String,
        imagen: String,
        fecha: Date,
        habilitado: {
            type: Boolean,
            default: true
        }


    }],
    pdfs: [{
        nombre: String,
        descripcion: String,
        tipo: String,
        servicio: String,
        url: String,
        localUrl: String,
        fecha: {
            type: Date,
            default: Date.now()
        }
    }],
    recordatorios: [{
        nombre: String,
        descripcion: String,
        fecha: {
            type: Date,
            default: Date.now()
        },
        fechaLimite: {
            type: Date,
            default: ""
        },
        prioridad: String,
        completed: {
            type: Boolean,
            default: false
        }
    }],
    publicaciones: [{
        titulo: String,
        descripcion: String,
        subtitulo: String,
        imagen: String,
        localUrl: String,
        fecha: {
            type: Date,
            default: Date.now()
        }
    }],
});

//exportar
//export default mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);