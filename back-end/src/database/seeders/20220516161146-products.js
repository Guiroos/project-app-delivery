'use strict';
const dotenv = require('dotenv');
dotenv.config();

const prefixHOST = process.env.HEROKU_HOST || 'http://localhost:3001';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('products',
    [{
      id: 1,
      name: 'Skol Lata 350ml',
      price: 2.89,
      url_image: `${prefixHOST}/images/skol_lata_350ml.jpg`,
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: 7.98,
      url_image: `${prefixHOST}/images/heineken_600ml.jpg`,
    },
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      price: 2.19,
      url_image: `${prefixHOST}/images/antarctica_pilsen_300ml.jpg`,
    },
    {
      id: 4,
      name: 'Brahma 600ml',
      price: 6.99,
      url_image: `${prefixHOST}/images/brahma_600ml.jpg`,
    },
    {
      id: 5,
      name: 'Skol 269ml',
      price: 2.39,
      url_image: `${prefixHOST}/images/skol_269ml.jpg`,
    },
    {
      id: 6,
      name: 'Skol Beats Senses 313ml',
      price: 6.99,
      url_image: `${prefixHOST}/images/skol_beats_senses_313ml.jpg`,
    },
    {
      id: 7,
      name: 'Becks 330ml',
      price: 5.79,
      url_image: `${prefixHOST}/images/becks_330ml.jpg`,
    },
    {
      id: 8,
      name: 'Brahma Duplo Malte 350ml',
      price: 3.29,
      url_image: `${prefixHOST}/images/brahma_duplo_malte_350ml.jpg`,
    },
    {
      id: 9,
      name: 'Becks 600ml',
      price: 9.89,
      url_image: `${prefixHOST}/images/becks_600ml.jpg'`,
    },
    {
      id: 10,
      name: 'Skol Beats Senses 269ml',
      price: 5.89,
      url_image: `${prefixHOST}/images/skol_beats_senses_269ml.jpg`,
    },
    {
      id: 11,
      name: 'Stella Artois 275ml',
      price: 4.79,
      url_image: `${prefixHOST}/images/stella_artois_275ml.jpg`,
    },
    {
      id: 12,
      name: 'Red Bull 250ml',
      price: 6.89,
      url_image: `${prefixHOST}/images/red-bull-250ml.jpg`,
    },
    {
      id: 13,
      name: 'Monster Energy 473ml',
      price: 8.49,
      url_image: `${prefixHOST}/images/monster-473ml.jpg`,
    },

    ], { timestamps: false });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};


