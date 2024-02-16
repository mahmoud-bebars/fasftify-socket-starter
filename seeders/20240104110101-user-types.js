"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_roles",
      [
        {
          id: 1,
          name: "superadmin",
        },
        {
          id: 2,
          name: "admin",
        },
        {
          id: 3,
          name: "sales",
        },
        {
          id: 4,
          name: "scanner",
        },
        {
          id: 5,
          name: "user",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_roles", null, {});
  },
};
