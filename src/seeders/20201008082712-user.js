'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data =[];
      for (let index = 0; index < 14000; index++) {
          const user = {
            username : `chuhuumanh${index}`,
            password :'secret',
            createdAt : new Date(),
            updatedAt : new Date()
          }
          data.push(user)
      }
      await queryInterface.bulkInsert('users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
