const tasksModel = require("../models/tasksModel"); // importa os métodas da classe tasksModel

const getAll = async (require, response) => {
    
    // função asincrona, necessita do await(fica esperando o retorno)
    const tasks = await tasksModel.getAll(); 
    return response.status(200).json(tasks);
};

module.exports = {
    getAll
    
};