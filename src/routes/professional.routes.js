const express = require('express');

let app = express();
let Profesional = require('../models/professional');
let Zona = require('../models/zona');
let Especialidad = require('../models/especialidad')


app.get('/', (req, res) => {
    
    Profesional.find({})
               .exec( (err, profesionales) => {
                   if(err){
                       return res.status(500).json({
                           ok: false,
                           err
                       })
                   }

                   res.json({
                       ok: true,
                       profesionales
                   })
               })
})
//====================================
//OBTENER PROFESIONAL POR ESPECIALIDAD
//====================================
app.get('/especialidad/:id', (req, res) => {

    let id= req.params.id;
    
    Profesional.find({especialidad:id}, 'nombre especialidad')
               .sort('nombre apellido')
               .populate('Especialidades', 'detalle')
               .exec( (err, profesionales) => {
                   if(err){
                       return res.status(500).json({
                           ok: false,
                           err
                       })
                   }

                   res.json({
                       ok: true,
                      profesionales
                   })
               })
})


//====================================
//OBTENER PROFESIONAL POR ZONA
//====================================
app.get('/zona/:id', (req, res) => {

    let id= req.params.id;
    
    Profesional.find({zona:id}, 'nombre apellido zona')
               .sort('nombre apellido')
               .populate('Zonas', 'detalle')
               .exec( (err, profesionales) => {
                   if(err){
                       return res.status(500).json({
                           ok: false,
                           err
                       })
                   }

                   res.json({
                       ok: true,
                      profesionales
                   })
               })
})

app.post('/zona', (req, res) => {
    let body = req.body;
    let zona = new Zona({
        detalle:body.detalle
    })

    zona.save((err, zonaDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            zonaDB
        })
    })
})

app.post('/especialidad', (req, res) => {
    let body = req.body;
    let especialidad = new Especialidad({
        detalle:body.detalle
    })

    especialidad.save((err, especialidadDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            especialidadDB
        })
    })
})


app.post('/', (req, res) => {
    
    let body = req.body;
    console.log(body);
    let profesional = new Profesional({
        nombre: body.nombre,
        apellido: body.apellido,
        dni:body.dni,
        telefono: body.telefono,
        email: body.email,
        img: body.img,
        zona: body.zona,
        especialidad: body.especialidad,
        descripcion:body.descripcion
    })

    profesional.save( (err, profesionalDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!profesionalDB){
            return res.status(400).json({
                ok:false,
                message: 'Hubo un error al crear el perfil, intente de nuevo',
                err
            })
        }

        res.json({
            ok:true, 
            profesional: profesionalDB
        })
    } )
})


app.get('/zona', (req, res) => {
    Zona.find({})
        .exec( (err, zonas) => {
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok: true,
                zonas
            })
        } )
})
 

app.get('/especialidad', (req, res) => {
    Especialidad.find({})
        .exec( (err, especialidad) => {
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok: true,
               especialidad
            })
        } )
})

module.exports = app;