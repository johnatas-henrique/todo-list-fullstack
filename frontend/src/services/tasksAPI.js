import axios from 'axios';

require('dotenv').config();

const urlBase = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/tasks`;

const getAllTasks = async () => axios.get(urlBase).catch((e) => e);
const postTask = async (postBody) => axios.post(urlBase, postBody).catch((e) => e);
const deleteTask = async (taskId) => axios.delete(`${urlBase}/${taskId}`).catch((e) => e);

export {
  getAllTasks,
  postTask,
  deleteTask,
};
