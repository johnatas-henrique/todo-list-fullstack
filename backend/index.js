const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT || 3000;

app.get('/tasks', (req, res) => {
  res.status(200).json({ message: 'ok', ping: req.body.ping });
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
