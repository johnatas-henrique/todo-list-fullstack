const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    
  }
  Tasks.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Tasks',
    tableName: 'tasks',
    timestamps: false,
  });
  return Tasks;
};
