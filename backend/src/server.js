const app = require('./app');
require('dotenv').config(); // importa a biblioteca dotenv que 

const PORT = process.env.PORT || 3333 // variável de ambiente da porta de acesso
 
// escutador de porta, fica esperando a rota 3333 ser requisitada
app.listen(PORT, () => console.log(`servidor rodando na porta: ${PORT}`));
