'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [
      {
        storeId: 1,
        name: 'Semen Portland 50kg',
        imageUrl: 'https://images.unsplash.com/photo-1617196034738-26c5f7e6e4b5',
        price: 65000,
        unit: 'sak',
        stock: 120,
        description: 'Semen berkualitas tinggi untuk konstruksi bangunan.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeId: 1,
        name: 'Pasir Halus',
        imageUrl: 'https://images.unsplash.com/photo-1581092919535-7146d2cdb658',
        price: 300000,
        unit: 'kubik',
        stock: 40,
        description: 'Pasir halus cocok untuk plester dan acian.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeId: 2,
        name: 'Besi Beton 10mm',
        imageUrl: 'https://images.unsplash.com/photo-1597000804693-8c6f5f0a4f4c',
        price: 75000,
        unit: 'batang',
        stock: 200,
        description: 'Besi beton standar SNI diameter 10mm.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeId: 3,
        name: 'Cat Tembok Interior 5kg',
        imageUrl: 'https://images.unsplash.com/photo-1581579185169-9a6b0e9b7c59',
        price: 120000,
        unit: 'pail',
        stock: 60,
        description: 'Cat tembok interior warna putih doff.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
