const express = require('express');
const app = express();
const router = require('./router'); // importa o router para cá

app.use(router); // utilizará o arquivo router para acessar as rotas para as requisições

// permite a exportação desse arquivo para outros arquivos
module.exports = app;
