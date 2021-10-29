const rescue = require('express-rescue');
const { getAllService, postService, putService } = require('../services/tasks');
const schemasJoi = require('./schemasJoi');
const { joiError } = require('./errors');

const validateJoi = async (reqInfo) =>
  schemasJoi.addTask.validateAsync(reqInfo).catch((fail) => joiError(fail));

const getAllTasks = rescue(async (_req, res) => {
  const serviceReturn = await getAllService();
  return res.status(200).json(serviceReturn);
});

const postTask = rescue(async (req, res, next) => {
  const isValid = await validateJoi(req.body);
  if (isValid.error) return next(isValid);

  const serviceReturn = await postService(req.body);
  return res.status(201).json(serviceReturn);
});

const putTask = rescue(async (req, res, next) => {
  const { id } = req.params;
  const isValid = await validateJoi(req.body);
  if (isValid.error) return next(isValid);

  const serviceReturn = await putService(req.body, id);
  if (serviceReturn.error) return next(serviceReturn);

  return res.status(200).json(serviceReturn);
});

module.exports = {
  getAllTasks,
  postTask,
  putTask,
};
