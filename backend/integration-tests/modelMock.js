let db = [];
let id = 1;
const inDataValue = (data) => ({ dataValues: data });

const findAll = () => db.map(inDataValue);
const findByPk = (taskId) => {
  const item = db.find((task) => Number(task.id) === Number(taskId));
  if (item) return inDataValue(item);
  return item;
};

const destroy = (taskId) => {
  const dbBefore = db.length;
  db = db.filter((task) => Number(task.id) === Number(taskId));
  return dbBefore - db.length;
};

const update = (obj, where) => {
  db = db.map((task) => (task.id === where.id ? { ...obj, id: task.id } : task));
  return db.map(inDataValue);
};

const create = (obj) => {
  const item = { ...obj, createdAt: new Date(obj.createdAt), id };
  db.push(item);
  id += 1;
  return inDataValue(item);
};

module.exports = {
  db, findAll, findByPk, destroy, update, create,
};
