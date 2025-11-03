//swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Configurar swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Documentacion de la API',//Titulo
        version: '1.0.0',//Version
        description: 'Esta es la documentacion de la API'
    },
    servers: [
        {
            url: 'http://localhost:3000', //URL del servidor
            description: 'Servidor de desarrollo'
        }
    ]
};
const options = {
    swaggerDefinition,
    //Rutas donde se encuentran los archivos con anotaciones de Swagger
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options)

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
