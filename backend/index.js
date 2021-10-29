require('dotenv').config();
const express = require('express');
const { getAllTasks, postTask } = require('./controllers/tasks');
const { otherError } = require('./controllers/errors');

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT || 3000;

app.get('/tasks', getAllTasks);
app.post('/tasks', postTask);

app.use(otherError);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
