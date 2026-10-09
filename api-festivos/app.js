
const express = require('express');
const bd = require('./modelos/bd');

const app = express();
const puerto = 3030;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuracion/swagger.config');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require('./rutas/festivo.rutas')(app);

async function iniciarAplicacion() {
    try {
        await bd.conectar();

        app.listen(puerto, () => {
            console.log(`API Festivos iniciada en http://localhost:${puerto}`);
        });
    } catch (error) {
        console.error('Error iniciando API Festivos:', error);
        process.exit(1);
    }
}

iniciarAplicacion();
