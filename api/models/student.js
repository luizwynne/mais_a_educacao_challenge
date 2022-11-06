'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Student extends Model {}

  Student.init({

    name: {
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