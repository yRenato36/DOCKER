// recebe as requisições e executa função assim que essas requisições são chamadas

const express = require('express');
const tasksController = require('./controllers/tasksController'); // importando objeto que contém a função getAll()
const tasksMiddleware = require('./middlewares/tasksModdleware'); // importando objeto que contém a função validateFieldTitle() e validateFieldStatus()

//router.get('/tasks', (request, response) => response.status(200).send('Running the router'))
const router = express.Router();
router.get('/tasks', tasksController.getAll);
// a sequência de execução da requisição é da esquerda para direita (ordem de leitura)
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',
    tasksMiddleware.validateFieldTitle, 
    tasksMiddleware.validateFieldStatus, 
    tasksController.updateTask
);

module.exports = router;