'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Student extends Model {}

  Student.init({

    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false
    },

    ra: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cpf: {
      type: Sequelize.STRING,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Student',
  });

  return Student;
  
};