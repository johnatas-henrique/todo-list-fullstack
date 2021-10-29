require('dotenv').config();
const express = require('express');
const { getAllTasks, postTask, putTask, deleteTask } = require('./controllers/tasks');
const { otherError } = require('./controllers/errors');

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT;

app.get('/tasks', getAllTasks);
app.post('/tasks', postTask);
app.put('/tasks/:id', putTask);
app.delete('/tasks/:id', deleteTask);

app.use(otherError);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

module.exports = app;
