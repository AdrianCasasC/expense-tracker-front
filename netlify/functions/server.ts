// netlify/functions/server.js
const { createNodeRequestHandler } = require('@angular/ssr/node');
const appServer = require('../../dist/expense-tracker-front/server/main'); // Asegúrate de la ruta correcta

exports.handler = createNodeRequestHandler(appServer);
