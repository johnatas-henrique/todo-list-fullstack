const Joi = require('joi');

const addTask = Joi.object({
  name: Joi.string().min(3).required(),
  status: Joi.string().required(),
  createdAt: Joi.string().required(),
});

module.exports = {
  addTask,
};
