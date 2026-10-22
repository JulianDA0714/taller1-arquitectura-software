
const { MongoClient } = require('mongodb');
const configBD = require('../configuracion/bd.config');

class ConexionBD {

    static cliente = null;
    static basedatos = null;

    static async conectar() {
        const url = `mongodb://${configBD.SERVIDOR}:${configBD.PUERTO}`;

        this.cliente = new MongoClient(url);

        try {
            await this.cliente.connect();

            this.basedatos = this.cliente.db(configBD.BASEDATOS);

            await this.basedatos.command({ ping: 1 });

            console.log('Conexión a MongoDB establecida correctamente');

        } catch (error) {
            this.basedatos = null;
            await this.cliente.close();
            throw error;
        }
    }

    static obtenerBaseDatos() {
        if (!this.basedatos) {
            throw new Error('No se ha establecido conexión con MongoDB');
        }

        return this.basedatos;
    }
}

module.exports = ConexionBD;
