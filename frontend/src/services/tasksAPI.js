import axios from 'axios';

require('dotenv').config();

// const urlBase = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/tasks`;
const urlBase = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';

const getAllTasks = async () => axios.get(urlBase).catch((e) => e);
const postTask = async () => axios.post(`${urlBase}/tasks`).catch((e) => e);

export { getAllTasks, postTask };
