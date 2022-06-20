const { Tasks } = require('../models');

const toISODate = (date) => {
  const [ano, mes, dia] = date.split('/');
  return `${mes}-${dia}-${ano}`;
};

const toBRDate = (date) => new Date(date).toLocaleDateString('pt-BR');

const toUnderId = (data) => {
  const { id, createdAt, ...rest } = data.dataValues;
  return { _id: id, createdAt: toBRDate(createdAt), ...rest };
};

const getAllService = async () => {
  const resultDB = await Tasks.findAll();
  return resultDB.map(toUnderId);
};

const postService = async (reqInfo) => {
  const resultDB = await Tasks.create({ ...reqInfo, createdAt: toISODate(reqInfo.createdAt) });
  return toUnderId(resultDB);
};

const putService = async (reqInfo, id) => {
  const resultDB1 = await Tasks.findByPk(id);
  if (!resultDB1) {
    return { error: true, message: 'Tarefa não encontrada', code: 'notFound' };
  }
  await Tasks.update(reqInfo, { where: { id } });
  return { ...reqInfo, _id: id };
};

const deleteService = async (id) => {
  const resultDB = await Tasks.destroy({ where: { id } });
  return resultDB;
};

module.exports = {
  getAllService,
  postService,
  putService,
  deleteService,
};
