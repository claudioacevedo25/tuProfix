const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let professionalSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellido: { type: String, required: [true, 'El apellido es obligatorio'] },
    dni:{type:Number, required:[true, 'Es necesario ingresar tu dni']},
    telefono: { type: Number, required: [true, 'El telefono es un dato obligatorio'] },
    email: { type: String, required: [true, 'El nombre es obligatorio'] },
    img: { type: String, required: false },
    zona: { type: Schema.Types.ObjectId, ref: 'zonas', required: [true, 'Es obligatorio seleccionar una zona de trabajo']},
    especialidad: { type: Schema.Types.ObjectId, ref: 'especialidades', required:[true, 'Es obligatorio elegir una profesion']  },
    descripcion: { type: String, required: [true, 'Es necesario una breve descripcion de ti '] },

    
})

module.exports = mongoose.model('Profesionales', professionalSchema)