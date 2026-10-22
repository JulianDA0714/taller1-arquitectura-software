const swaggerJsdoc = require('swagger-jsdoc');

const opciones = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Festivos',
            version: '1.0.0',
            description: 'API REST para la gestión y consulta de festivos de Colombia'
        },
        servers: [
            {
                url: 'http://localhost:3030',
                description: 'Servidor local'
            }
        ]
    },
    apis: ['./rutas/*.js']
};

const swaggerSpec = swaggerJsdoc(opciones);

module.exports = swaggerSpec;
