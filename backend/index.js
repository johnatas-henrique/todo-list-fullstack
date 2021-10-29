const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.port || 3000;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
