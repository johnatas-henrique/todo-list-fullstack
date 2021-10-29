const connection = require('./connection');

const findTasks = async () => {
  const db = await connection();
  return db.collection('Tasks').find().toArray();
};

const postTask = async (reqInfo) => {
  const db = await connection();
  return db.collection('Tasks').insertOne(reqInfo)
    .then(({ insertedId }) => ({ _id: insertedId, ...reqInfo }));
};

module.exports = {
  findTasks,
  postTask,
};
