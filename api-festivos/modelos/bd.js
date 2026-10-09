const { MongoClient } = require('mongodb');
const configBD = require('../configuracion/bd.config');

const url = `mongodb://${configBD.SERVIDOR}:${configBD.PUERTO}`;

let cliente;
let basedatos;

async function conectar() {
    cliente = new MongoClient(url);

    try {
        await cliente.connect();
        basedatos = cliente.db(configBD.BASEDATOS);
        await basedatos.command({ ping: 1 });

        console.log('Conexión a MongoDB establecida correctamente');
    } catch (error) {
        await cliente.close();
        throw error;
    }
}

function obtenerBaseDatos() {
    if (!basedatos) {
        throw new Error('No se ha establecido conexión con MongoDB');
    }

    return basedatos;
}

module.exports = {
    conectar,
    obtenerBaseDatos
};
