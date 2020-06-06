//Importa express
const express = require('express');
//Importa variables de entorno
require('dotenv').config({path: 'variables.env'});
//Importa el router
const router =  require('./routes');
//Importa express-formidable
const formidable = require('express-formidable');
//Importa mongoose
const mongoose = require('mongoose');
//Importa cors
const cors = require('cors');

//Crea el servidor
const app = express();

//Asigna carpeta publica
app.use('/public', express.static('public'));

//Configura cors
app.use(cors());

//Configura express-formidable
app.use(formidable({
    encoding: 'utf-8',
    //uploadDir: 'output',
    multiples: true,
    keepExtensions: true
}));

//Configura mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://oscarga8a:IngElec123@dbcluster-nhvz2.mongodb.net/api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//Habilita routing
app.use('/api', router());

//Asigna el host
const host = process.env.HOST || '0.0.0.0';
//Asigna el puerto
const port = process.env.PORT || 3500;

//Arranca el servidor
app.listen(port, host, () => {
    console.log(`API iniciada en ${host} : ${port}`);
});