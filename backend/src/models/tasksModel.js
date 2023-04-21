/* realiza a conexão com o banco de dados, aqui será dispostas todas as funções irão 
interagir ao banco de dados */
const connection = require('./connection');

// retorna todas as tasks do banco de dados
const getAll = async () => {
    //[tasks] = array destruction, pegando a primeira posição do array que é retornado do getAll e armazenando em tasks
    const [tasks] = await connection.execute('SELECT * FROM tasks'); //método execute, espera executar um query de SQL
    return tasks;
}; 


// recebe um task como parâmetro
const createTask = async (task) => {
    // desestrutira o objeto task recebido como parâmetro e armazena em task
    const { title } = task;
    // Date.now(): retorna milisegundos desde 1970
    // new Date: cria um objeto que recebe a data em milisegundos e coloca em data completa
    // toUTCString(): formata para uma data completa e comum
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)'; // cada interrogação representa um valor que será recebido                                      
    
    // []: recebe o primeiro array, tal qual contém as informações do banco de dados
    const [createTask] = await connection.execute(query, [title, 'pendente', dateUTC]); // esse array irá preencher as interrogações na variável query

    return {insertId: createTask.insertId}; // retorna o Id que foi inserido no banco de dados
}

// exportando um objeto que contém todas as funções
module.exports = {
    getAll,
    createTask,
};