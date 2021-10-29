const { findTasks } = require('../models/tasks');

const getAllServices = async () => {
  const resultBD = await findTasks();
  return resultBD;
};

module.exports = {
  getAllServices,
};
