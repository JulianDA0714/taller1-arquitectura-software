const bd = require('./bd');

class FestivoRepositorio {

    static async listarTipos() {
        const basedatos = bd.obtenerBaseDatos();

        return await basedatos
            .collection('tipos')
            .find({})
            .sort({ id: 1 })
            .toArray();
    }

    static async buscarTipoPorId(idTipo) {
        const basedatos = bd.obtenerBaseDatos();

        return await basedatos
            .collection('tipos')
            .findOne({ id: idTipo });
    }

    static async agregarFestivo(idTipo, festivo) {
        const basedatos = bd.obtenerBaseDatos();

        return await basedatos
            .collection('tipos')
            .updateOne(
                { id: idTipo },
                { $push: { festivos: festivo } }
            );
    }

    static async actualizarFestivo(idTipo, nombreActual, festivo) {
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

    static async eliminarFestivo(idTipo, nombre) {
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
}

module.exports = FestivoRepositorio;
