/* import Support from "../models/support"; */

const Support = require('../models/support');

const get = async (req, res) => {
    try {
        const support = await Support.find();
        res.status(200).json(support);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const newMessage = async (req, res) => {
    const support = req.body;
    const newSupport = new Support(support);
    try {
        await newSupport.save();
        res.status(201).json(newSupport);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}




module.exports = { get, newMessage }