
const express = require('express');
const bd = require('./repositorios/bd');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuracion/swagger');

class App {
    constructor() {
        this.app = express();
        this.puerto = 3030;

        this.configurarMiddlewares();
        this.configurarRutas();
    }

    configurarMiddlewares() {
        this.app.use(express.json());
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    configurarRutas() {
        require('./rutas/festivo.rutas')(this.app);
    }

    async escuchar() {
        try {
            await bd.conectar();

            this.app.listen(this.puerto, () => {
                console.log(`API Festivos iniciada en http://localhost:${this.puerto}`);
            });
        } catch (error) {
            console.error('Error iniciando API Festivos:', error);
            process.exit(1);
        }
    }
}

module.exports = App;
