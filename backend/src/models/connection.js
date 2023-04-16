// Realiza a conexão com o banco de dados

const mysql = require('mysql2/promise');

/* string de conexão - contém todas as informações de conexão com o banco de dados
as informações estão armazenadas como variáveis de ambiente */
const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB                                    
});

// exporta a string de conexão para outros arquivos
module.exports = connection;