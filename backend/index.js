require('dotenv').config();
const express = require('express');
const { getAllTasks } = require('./controllers/tasks');

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT || 3000;

app.get('/tasks', getAllTasks);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
