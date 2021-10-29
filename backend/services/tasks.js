const { findTasks, postTask } = require('../models/tasks');

const getAllService = async () => {
  const resultBD = await findTasks();
  return resultBD;
};

const postService = async (reqInfo) => {
  const resultBD = await postTask(reqInfo);
  return resultBD;
};

module.exports = {
  getAllService,
  postService,
};
