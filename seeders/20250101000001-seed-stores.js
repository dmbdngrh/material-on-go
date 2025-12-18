'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stores', [
      {
        name: 'Toko Bangunan Jaya Abadi',
        imageUrl: 'https://images.unsplash.com/photo-1581091870627-3a5b0b7a3c8a',
        address: 'Jl. Raya Veteran No. 12, Medan',
        description: 'Menyediakan berbagai kebutuhan material bangunan lengkap dan terpercaya.',
        rating: 4.6,
        isOpen: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sinar Baja Material',
        imageUrl: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41',
        address: 'Jl. Gatot Subroto No. 45, Medan',
        description: 'Spesialis besi, baja ringan, dan material konstruksi berat.',
        rating: 4.4,
        isOpen: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mitra Bangunan Sejahtera',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        address: 'Jl. Setia Budi No. 88, Medan',
        description: 'Material bangunan harian dengan harga bersahabat.',
        rating: 4.2,
        isOpen: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores', null, {});
  }
};
