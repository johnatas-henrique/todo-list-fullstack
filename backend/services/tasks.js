const { findTasks, postTask, getTask, putTask } = require('../models/tasks');

const getAllService = async () => {
  const resultDB = await findTasks();
  return resultDB;
};

const postService = async (reqInfo) => {
  const resultDB = await postTask(reqInfo);
  return resultDB;
};

const putService = async (reqInfo, id) => {
  const resultDB1 = await getTask(id);
  if (!resultDB1) {
    return { error: true, message: 'Tarefa não encontrada', code: 'not_found' };
  }
  const resultDB2 = await putTask(reqInfo, id);
  return resultDB2;
};

module.exports = {
  getAllService,
  postService,
  putService,
};
