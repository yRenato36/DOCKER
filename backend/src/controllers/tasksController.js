const { response } = require("express");
const tasksModel = require("../models/tasksModel"); // importa os métodas da classe tasksModel

const getAll = async (_require, response) => {
    
    // função asincrona, necessita do await(fica esperando o retorno)
    const tasks = await tasksModel.getAll(); 
    return response.status(200).json(tasks); // retorna um json com um objeto que contém todas as tasks
};

const createTask = async (request, response) => {
    // cria uma task a partir com os dados do corpo da requisição
    const createdTask = await tasksModel.createTask(request.body);
    return response.status(201).json(createdTask); // retorna um json com a task que foi criada
};

module.exports = {
    getAll,
    createTask,
};