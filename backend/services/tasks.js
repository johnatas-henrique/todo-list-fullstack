const { findTasks, postTask, putTask, deleteTask } = require('../models/tasks');

const getAllService = async () => {
  const resultDB = await findTasks();
  return resultDB;
};

const postService = async (reqInfo) => {
  const resultDB = await postTask(reqInfo);
  return resultDB;
};

const putService = async (reqInfo, id) => {
  const resultDB1 = await findTasks();
  const findTaskById = resultDB1.find(({ _id }) => _id === id);
  if (!findTaskById) {
    return { error: true, message: 'Tarefa não encontrada', code: 'notFound' };
  }
  const resultDB2 = await putTask(reqInfo, id);
  return resultDB2;
};

const deleteService = async (id) => {
  const resultDB = await deleteTask(id);
  return resultDB;
};

module.exports = {
  getAllService,
  postService,
  putService,
  deleteService,
};
