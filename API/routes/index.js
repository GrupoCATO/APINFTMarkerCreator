//Importa express
const express = require('express');
//Obtiene el Router de express
const router = express.Router();
//Importa el controlador del modelo Marker
const markerControllers = require('../controllers/markerControllers');

module.exports = () => {

    router.route('/markers')
        .get(markerControllers.showMarkers)
        .post(markerControllers.addMarker);

    router.route('/markers/:id')
        .get(markerControllers.showMarker)
        .put(markerControllers.updateMarker)
        .delete(markerControllers.deleteMarker);
        
    return router;
}