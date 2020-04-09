const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let zonaSchema = new Schema({
    detalle: {type: String, required: [true, 'Es necesario ingresar un detalle']}
})

module.exports = mongoose.model('Zonas', zonaSchema) 