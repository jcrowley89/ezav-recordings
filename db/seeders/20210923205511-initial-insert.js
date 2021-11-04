"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Admins", [
      {
        firstName: "John",
        lastName: "Crowley",
        email: "johncrowleydev@gmail.com",
        role: "developer",
        password: "$2a$08$RshQbBR7hs6MXPr/xmlOMOM3p6OSh8yZayUxKbNAZ8Os5lxaxP4jK",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    // await queryInterface.bulkInsert("Programs", [
    //   {
    //     eventTitle: "2021 Test Program",
    //     clientName: "Test Orginization of Example Stuff",
    //     beginsOn: new Date("2021-11-12"),
    //     endsOn: new Date("2021-11-15"),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
    // await queryInterface.bulkInsert("Presenters", [
    //   {
    //     firstName: "Testy",
    //     lastName: "McTestFace",
    //     email: "testy@mail.com",
    //     code: "AZV324",
    //     ProgramId: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
    // await queryInterface.bulkInsert("Recordings", [
    //   {
    //     presentationTitle: "New Horizons in Fake Data",
    //     PresenterId: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
