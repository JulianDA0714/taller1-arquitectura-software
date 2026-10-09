const bd = require('../modelos/bd');

async function listarTipos() {
    const basedatos = bd.obtenerBaseDatos();

    return await basedatos
        .collection('tipos')
        .find({})
        .sort({ id: 1 })
        .toArray();
}


async function buscarTipoPorId(idTipo) {
    const basedatos = bd.obtenerBaseDatos();

    return await basedatos
        .collection('tipos')
        .findOne({ id: idTipo });
}

async function agregarFestivo(idTipo, festivo) {
    const basedatos = bd.obtenerBaseDatos();

    return await basedatos
        .collection('tipos')
        .updateOne(
            { id: idTipo },
            { $push: { festivos: festivo } }
        );
}


async function actualizarFestivo(idTipo, nombreActual, festivo) {
    const basedatos = bd.obtenerBaseDatos();

    return await basedatos
        .collection('tipos')
        .updateOne(
            {
                id: idTipo,
                'festivos.nombre': nombreActual
            },
            {
                $set: {
                    'festivos.$': festivo
                }
            }
        );
}

async function eliminarFestivo(idTipo, nombre) {
    const basedatos = bd.obtenerBaseDatos();

    return await basedatos
        .collection('tipos')
        .updateOne(
            { id: idTipo },
            {
                $pull: {
                    festivos: { nombre: nombre }
                }
            }
        );
}


module.exports = {
    listarTipos,
    buscarTipoPorId,
    agregarFestivo,
    actualizarFestivo,
    eliminarFestivo
};
