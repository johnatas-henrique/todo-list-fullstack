const { getAllServices } = require('../services/tasks');

const getAllTasks = async (_req, res) => {
  const serviceReturn = await getAllServices();
  res.status(200).json(serviceReturn);
};

module.exports = {
  getAllTasks,
};
