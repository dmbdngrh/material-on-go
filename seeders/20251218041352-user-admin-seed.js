'use strict';
const fs = require('fs').promises;
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/users.json','utf-8'));
    data = await Promise.all(data.map(async element => {
      // console.log(element);
      
      element.password = await bcrypt.hash(element.password, 10);
      // console.log(element.password);
      
      element.updatedAt = element.createdAt = new Date();
      return element;
    }));
    // console.log(data);
    
    await queryInterface.bulkInsert('Users', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
