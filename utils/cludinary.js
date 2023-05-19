/* import cloudinary from "cloudinary"
import dotenv from "dotenv"; */

const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();


const cloudinaryConfig = (req, res, next) => {
    try {
        const config = cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.API_KEY_CLOUDINARY,
            api_secret: process.env.API_SECRET_CLOUDINARY
        });

        if(!config){
            return res.status(500).json({message: "Error del servidor"})
        }
        next();
    } catch (error) {
        return res.status(500).json({message: "Error del servidor"})
    }
}

module.exports = cloudinaryConfig
