'use strict';
const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/orderitems.json', 'utf-8'));
    data = data.map(element => {
      element.updatedAt = element.createdAt = new Date();
      return element;
    });
    
    await queryInterface.bulkInsert('OrderItems', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', null, {});
  }
};