const express = require('express');
const tasksController = require('./controllers/tasksController'); // importando objeto que contém a função getAll()

//router.get('/tasks', (request, response) => response.status(200).send('Running the router'))
const router = express.Router();
router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksController.createTask);
 
module.exports = router;