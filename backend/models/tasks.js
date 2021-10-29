const { ObjectId } = require('mongodb');
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

const putTask = async (reqInfo, id) => {
  const db = await connection();
  await db.collection('Tasks')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: reqInfo });
  return { _id: id, ...reqInfo };
};

const deleteTask = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  await db.collection('Tasks').deleteOne({ _id: ObjectId(id) });
  return null;
};

module.exports = {
  findTasks,
  postTask,
  putTask,
  deleteTask,
};
