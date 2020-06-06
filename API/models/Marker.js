//Importa mongoose
const mongoose = require('mongoose');
//Obtiene Schema para el modelo Marker
const Schema = mongoose.Schema;

//Configura el Schema del modelo Marker
const markerSchema = new Schema({
    nameImage: {
        type: String
    },
    urlImage: {
        type: String
    },
    urlDescriptors: {
        type: String
    },
    urlFolderMarker: {
        type: String
    }
});

module.exports = mongoose.model('Marker', markerSchema);