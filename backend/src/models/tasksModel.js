/* realiza a conexão com o banco de dados, aqui será dispostas todas as funções irão 
interagir ao banco de dados */
const connection = require('./connection');

// retorna todas as tasks do banco de dados
const getAll = async () => {
    //[tasks] = array destruction, pegando a primeira posição do array que é retornado do getAll e armazenando em tasks
    const [tasks] = await connection.execute('SELECT * FROM tasks'); //método execute, espera executar um query de SQL
    return tasks;
}; 

// exportando um objeto que contém todas as funções
module.exports = {
    getAll
};