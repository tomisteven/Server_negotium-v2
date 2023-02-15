/* import mongoose, {Schema} from "mongoose"; */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupportSchema = new Schema({
    name: String,
    apellido: String,
    email: {
        type: String,
    },
    asunto: String,
    message: String,
    fecha: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Support', SupportSchema);