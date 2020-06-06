//Importa el modelo Marker
const Marker = require('../models/Marker');
//Importa fs
const fs = require('fs');

//Muestra todos los marcadores en la base de datos
exports.showMarkers = async (req, res) => {
    try {
        const markers = await Marker.find({})
        /*fs.rmdir(`public/nft-marker/5ec1a42901e89b48bc90b884`, () => {
            console.log('borrado');
            res.json(markers);
        });*/ 
        res.json(markers);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Agrega un marcador a la base de datos
exports.addMarker = async (req, res, next) => {
    const marker = new Marker(req.fields);
    try {
        await marker.save();
        const nameWithExt = req.files.fileImage.name;
        const ext = nameWithExt.substr(nameWithExt.lastIndexOf('.'));
        if(!fs.existsSync(`public/nft-marker/${marker._id}/`)){
            fs.mkdir(`public/nft-marker/${marker._id}/`, () => {
                fs.copyFile(req.files.fileImage.path, `public/nft-marker/${marker._id}/${marker._id}${ext}`, () => {                
                });
                fs.mkdir(`public/nft-marker/${marker._id}/descriptors/`, () => {
                    fs.copyFile(req.files.fileIset.path, `public/nft-marker/${marker._id}/descriptors/${marker._id}.iset`, () => {});
                    fs.copyFile(req.files.fileFset.path, `public/nft-marker/${marker._id}/descriptors/${marker._id}.fset`, () => {});
                    fs.copyFile(req.files.fileFset3.path, `public/nft-marker/${marker._id}/descriptors/${marker._id}.fset3`, () => {});
                });
            });
    
            req.fields.urlImage = `public/nft-marker/${marker._id}/${marker._id}${ext}`;
            req.fields.urlDescriptors = `public/nft-marker/${marker._id}/descriptors/${marker._id}`;
            req.fields.urlFolderMarker = `public/nft-marker/${marker._id}`;
            const newmarker =  await Marker.findOneAndUpdate({_id: marker._id}, req.fields, {new: true});
            res.json(newmarker);
        } else {
            console.log('Ya existe la carpeta');
        }

    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra un marcador en la base de datos
exports.showMarker = async (req, res, next) => {
    try {
        const marker = await Marker.findById(req.params.id);
        res.json(marker);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Actualiza un marcador en la base de datos
exports.updateMarker = async (req, res, next) => {
    try {
        const newmarker =  await Marker.findOneAndUpdate({_id: req.params.id}, req.fields, {new: true});
        res.json(newmarker);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Elimina un marcador en la base de datos
exports.deleteMarker = async (req, res, next) => {
    try {
        const deletemarker = await Marker.findOneAndDelete({_id: req.params.id}); 
        if(fs.existsSync(`${deletemarker.urlFolderMarker}`)){
            fs.unlink(deletemarker.urlImage, () => {
                fs.unlink(`${deletemarker.urlDescriptors}.iset`, () => {
                    fs.unlink(`${deletemarker.urlDescriptors}.fset`, () => {
                        fs.unlink(`${deletemarker.urlDescriptors}.fset3`, () => {
                            fs.rmdir(`${deletemarker.urlFolderMarker}/descriptors`, () => {
                                setTimeout(() => {
                                    fs.rmdir(`${deletemarker.urlFolderMarker}`, () => {
                                        res.json(deletemarker);
                                    });
                                }, 100);
                            });
                        });
                    });
                });
            });
        } else {
            console.log('No existe la carpeta');
        }
    } catch (error) {
        console.log(error);
        next();
    }
}