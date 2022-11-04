'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Students', [
      {
        name: 'John Doe',
        email: 'example@example.com',
        ra: '202212356',
        cpf: '326125687-02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maria Dolores',
        email: 'maria.dolores@example.com',
        ra: '202212468',
        cpf: '324585687-22',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Carlos da Silva',
        email: 'carlossilva@example.com',
        ra: '202275469',
        cpf: '468795647-03',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fabio Alencar',
        email: 'fabioalencar@example.com',
        ra: '202212458',
        cpf: '126125458-02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eduardo Silva',
        email: 'eduarso.silva@example.com',
        ra: '202245856',
        cpf: '125125455-02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Marcos Claudino da Silva',
        email: 'marcos.silva@example.com',
        ra: '202212456',
        cpf: '154789658-03',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Allan da Silva Figueira',
        email: 'allan.figueira@example.com',
        ra: '202214578',
        cpf: '468796547-04',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
