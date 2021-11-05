const Joi = require('joi').extend(require('@joi/date'));

const addTask = Joi.object({
  name: Joi.string().min(3).required(),
  status: Joi.string().required(),
  createdAt: Joi.date().less('now').format('DD/MM/YYYY').required(),
});

module.exports = {
  addTask,
};
