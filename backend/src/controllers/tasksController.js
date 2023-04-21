const { response } = require("express");
const tasksModel = require("../models/tasksModel"); // importa os métodas da classe tasksModel
const { connect } = require("../router");
const { request } = require("../app");

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

const deleteTask = async (request, response) => {
    // sera recortado um id dos parametros da URL, assim sendo possível identificar quem será deletado
    const { id } = request.params;

    await tasksModel.deleteTask(id);
    return response.status(204).json(); // status 204 (requisição bem sucedida, porém se conteúdo)
}

const updateTask = async (request, response) => {
    const { id } = request.params; // recorta o id da URL

    // envia um id e o corpo da requisição para a função updateTask
    await tasksModel.updateTask(id, request.body);
    return response.status(204).json(); // status 204 (requisição bem sucedida, porém se conteúdo)
}

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};