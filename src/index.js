require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();



//los app.use SON MIDDLEWARE, funciones que se disparan con cada peticion que nosotros hagamos

//esto es de la libreria body-parser ...para procesar peticiones xwww-form-urlencode(algo generico)
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json()) 

//HABILITAR LA CARPETA PUBLICA
app.use(express.static(path.join(__dirname, './public')));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());




//USO DE LAS RUTAS
app.use('/professional', require('./routes/professional.routes'));


//BD
mongoose.connect(process.env.URLDB,
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
    (err, res) => {
        if(err) throw err;
        console.log('DataBase ONLINE');
    })


//Listener PORT
app.listen(process.env.PORT, () => {
    console.log(`Listening PORT ${process.env.PORT}`);
})

