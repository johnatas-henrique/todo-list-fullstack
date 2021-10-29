const connection = require('./connection');

const findTasks = async () => {
  const db = await connection();
  return db.collection('Tasks').find().toArray();
};

module.exports = {
  findTasks,
};
